import { useCallback, useEffect, useMemo, useState } from 'react';
import { InventoryForm } from './components/InventoryForm.tsx';
import { InventoryTable } from './components/InventoryTable.tsx';
import { initialItems } from './data/initialItems.ts';
import type { InventoryDraft, InventoryItem, Room } from './types.ts';

const STORAGE_KEY = 'casa-nova-inventory';

const rooms: Room[] = ['Banheiro', 'Quarto', 'Cozinha', 'Sala', 'Escritório', 'Lavanderia', 'Churrasqueira'];
type PurchaseFilter = 'Todos' | 'Comprados' | 'Pendentes';
type ApplianceFilter = 'Todos' | 'SomenteEletro' | 'SomenteNaoEletro';

function loadInitialItems(): InventoryItem[] {
  if (typeof window === 'undefined') {
    return initialItems;
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return initialItems;
    }
    const parsed: InventoryItem[] = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return initialItems;
    }
    return parsed.map((item, index) => {
      const fallback = initialItems[index] ?? initialItems[0];
      return {
        ...fallback,
        ...item,
        purchased: typeof item.purchased === 'boolean' ? item.purchased : fallback?.purchased ?? false
      };
    });
  } catch {
    return initialItems;
  }
}

function createId() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return `item-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
}

export default function App() {
  const [items, setItems] = useState<InventoryItem[]>(loadInitialItems);
  const [filterRoom, setFilterRoom] = useState<Room | 'Todos'>('Todos');
  const [purchaseFilter, setPurchaseFilter] = useState<PurchaseFilter>('Todos');
  const [applianceFilter, setApplianceFilter] = useState<ApplianceFilter>('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
  }, [items]);

  const closeForm = useCallback(() => {
    setIsFormOpen(false);
    setEditingItem(null);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }

    if (!isFormOpen) {
      return;
    }

    const originalOverflow = document.body.style.overflow;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeForm();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeForm, isFormOpen]);

  const filteredItems = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return items.filter((item) => {
      if (filterRoom !== 'Todos' && item.room !== filterRoom) {
        return false;
      }

      if (purchaseFilter === 'Comprados' && !item.purchased) {
        return false;
      }

      if (purchaseFilter === 'Pendentes' && item.purchased) {
        return false;
      }

      if (applianceFilter === 'SomenteEletro' && !item.isAppliance) {
        return false;
      }

      if (applianceFilter === 'SomenteNaoEletro' && item.isAppliance) {
        return false;
      }

      if (!normalizedSearch) {
        return true;
      }

      return (
        item.name.toLowerCase().includes(normalizedSearch) ||
        item.color.toLowerCase().includes(normalizedSearch) ||
        item.category.toLowerCase().includes(normalizedSearch)
      );
    });
  }, [applianceFilter, filterRoom, items, purchaseFilter, searchTerm]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filterRoom, purchaseFilter, applianceFilter, searchTerm, pageSize]);

  useEffect(() => {
    const totalPages = Math.max(1, Math.ceil(filteredItems.length / pageSize));
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, filteredItems.length, pageSize]);

  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredItems.slice(start, start + pageSize);
  }, [currentPage, filteredItems, pageSize]);

  const totals = useMemo(() => {
    const totalItems = items.length;
    const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);
    const appliances = items.filter((item) => item.isAppliance).length;
    const purchased = items.filter((item) => item.purchased).length;
    const pending = totalItems - purchased;
    const byRoom = rooms.map((room) => ({
      room,
      count: items.filter((item) => item.room === room).length,
      quantity: items
        .filter((item) => item.room === room)
        .reduce((acc, item) => acc + item.quantity, 0)
    }));

    return { totalItems, totalQuantity, appliances, purchased, pending, byRoom };
  }, [items]);

  function handleSubmit(draft: InventoryDraft, id?: string) {
    if (id) {
      setItems((prev) => prev.map((item) => (item.id === id ? { ...item, ...draft } : item)));
      return;
    }

    setItems((prev) => [...prev, { ...draft, id: createId() }]);
  }

  function handleOpenFormForNew() {
    setEditingItem(null);
    setIsFormOpen(true);
  }

  function handleEditRequest(item: InventoryItem) {
    setEditingItem(item);
    setIsFormOpen(true);
  }

  function handleResetEditing() {
    setEditingItem(null);
  }

  function handlePageChange(page: number) {
    setCurrentPage(page);
  }

  function handlePageSizeChange(size: number) {
    setPageSize(size);
  }

  function handleDelete(id: string) {
    const confirmDelete = window.confirm('Tem certeza que deseja remover este item do inventário?');
    if (!confirmDelete) {
      return;
    }
    setItems((prev) => prev.filter((item) => item.id !== id));
    if (editingItem?.id === id) {
      setEditingItem(null);
    }
  }

  function handleExport() {
    const headers = ['Cômodo', 'Item', 'Cor', 'Quantidade', 'Categoria', 'Eletrodoméstico', 'Observações'];
    const rows = items.map((item) => [
      item.room,
      item.name,
      item.color,
      item.quantity.toString(),
      item.category,
      item.isAppliance ? 'Sim' : 'Não',
      item.notes ?? ''
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(';'))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'inventario-casa-nova.csv');
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <main className="page">
      <header className="page-hero">
        <h1>Inventário da Casa Nova</h1>
        <p>Visualize, filtre e mantenha o controle do que já foi comprado para sua nova casa.</p>
      </header>

      <section className="card summary-card">
        <header className="summary-header">
          <div>
            <h2>Resumo</h2>
            <p>Visão rápida do seu inventário.</p>
          </div>
          <div className="summary-highlight">
            <span className="summary-highlight__value">{totals.totalItems}</span>
            <span className="summary-highlight__label">itens cadastrados</span>
          </div>
        </header>

        <div className="summary-metrics">
          <div className="metric-card">
            <span className="metric-label">Quantidade total</span>
            <span className="metric-value">{totals.totalQuantity}</span>
            <span className="metric-helper">somatório de unidades</span>
          </div>
          <div className="metric-card">
            <span className="metric-label">Eletrodomésticos</span>
            <span className="metric-value">{totals.appliances}</span>
            <span className="metric-helper">itens marcados como eletro</span>
          </div>
          <div className="metric-card metric-card--split">
            <div>
              <span className="metric-label">Comprados</span>
              <span className="metric-value metric-value--success">{totals.purchased}</span>
            </div>
            <div>
              <span className="metric-label">Pendentes</span>
              <span className="metric-value metric-value--warning">{totals.pending}</span>
            </div>
          </div>
        </div>

        <div className="summary-divider" role="separator" />

        <div className="summary-rooms">
          <h3>Distribuição por cômodo</h3>
          <div className="room-pills">
            {totals.byRoom.map(({ room, count, quantity }) => (
              <span className="room-pill" key={room}>
                <span className="room-pill__name">{room}</span>
                <span className="room-pill__meta">
                  {count} item{count !== 1 ? 's' : ''} • {quantity} unidade{quantity !== 1 ? 's' : ''}
                </span>
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="card filters-card">
        <h2>Filtros</h2>
        <div className="filters">
          <label>
            Cômodo
            <select value={filterRoom} onChange={(event) => setFilterRoom(event.target.value as Room | 'Todos')}>
              <option value="Todos">Todos</option>
              {rooms.map((room) => (
                <option key={room} value={room}>
                  {room}
                </option>
              ))}
            </select>
          </label>

          <label>
            Status de compra
            <select value={purchaseFilter} onChange={(event) => setPurchaseFilter(event.target.value as PurchaseFilter)}>
              <option value="Todos">Todos</option>
              <option value="Comprados">Comprados</option>
              <option value="Pendentes">Pendentes</option>
            </select>
          </label>

          <label>
            Eletrodomésticos
            <select
              value={applianceFilter}
              onChange={(event) => setApplianceFilter(event.target.value as ApplianceFilter)}
            >
              <option value="Todos">Todos</option>
              <option value="SomenteEletro">Somente eletrodomésticos</option>
              <option value="SomenteNaoEletro">Somente não eletrodomésticos</option>
            </select>
          </label>

          <label>
            Busca rápida
            <input
              type="search"
              value={searchTerm}
              placeholder="Nome, cor ou categoria"
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </label>
        </div>
      </section>

      <div className="inventory-toolbar">
        <div className="inventory-title">
          <h2>Lista de itens</h2>
          <p>Adicione novos itens ou exporte seu inventário.</p>
        </div>
        <div className="inventory-actions">
          <button type="button" className="primary-button" onClick={handleOpenFormForNew}>
            Adicionar item
          </button>
          <button type="button" className="secondary-button" onClick={handleExport}>
            Exportar CSV
          </button>
        </div>
      </div>

      <InventoryTable
        items={paginatedItems}
        onEdit={handleEditRequest}
        onDelete={handleDelete}
        totalItems={filteredItems.length}
        currentPage={currentPage}
        pageSize={pageSize}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />

      {isFormOpen ? (
        <div className="modal-backdrop" role="presentation" onClick={closeForm}>
          <div
            className="modal-content"
            role="dialog"
            aria-modal="true"
            aria-labelledby="inventory-form-title"
            onClick={(event) => event.stopPropagation()}
          >
            <InventoryForm
              rooms={rooms}
              onSubmit={handleSubmit}
              onCancelEdit={handleResetEditing}
              onClose={closeForm}
              editingItem={editingItem}
            />
          </div>
        </div>
      ) : null}
    </main>
  );
}


