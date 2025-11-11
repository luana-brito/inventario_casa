import type { InventoryItem } from '../types.ts';

interface InventoryTableProps {
  items: InventoryItem[];
  onEdit: (item: InventoryItem) => void;
  onDelete: (id: string) => void;
  totalItems: number;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

function StatusChip({ purchased }: { purchased: boolean }) {
  const label = purchased ? 'Comprado' : 'Pendente';
  const className = purchased ? 'status-chip status-chip--purchased' : 'status-chip status-chip--pending';
  return <span className={className}>{label}</span>;
}

function ApplianceChip({ isAppliance }: { isAppliance: boolean }) {
  return (
    <span className={isAppliance ? 'tag tag--appliance' : 'tag'}>
      {isAppliance ? 'Eletrodoméstico' : 'Item comum'}
    </span>
  );
}

const EditIcon = () => (
  <svg
    className="icon"
    viewBox="0 0 24 24"
    role="img"
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M4.5 17.25V19.5a.75.75 0 0 0 .75.75h2.25a.75.75 0 0 0 .53-.22L18.28 9.78a.75.75 0 0 0 0-1.06l-2.5-2.5a.75.75 0 0 0-1.06 0L4.72 16.97a.75.75 0 0 0-.22.53Z"
      fill="currentColor"
    />
    <path
      d="M16.5 3.75 15 5.25l2.5 2.5 1.5-1.5a1.5 1.5 0 0 0 0-2.12l-.88-.88a1.5 1.5 0 0 0-2.12 0Z"
      fill="currentColor"
    />
  </svg>
);

const DeleteIcon = () => (
  <svg
    className="icon"
    viewBox="0 0 24 24"
    role="img"
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M9 4h6l.5 1h4a1 1 0 1 1 0 2h-.93l-.92 11.17A2.5 2.5 0 0 1 15.16 20H8.84a2.5 2.5 0 0 1-2.49-2.83L6.27 7H5a1 1 0 0 1 0-2h4l.5-1Z"
      fill="currentColor"
    />
    <path
      d="M10 11v6m4-6v6"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);

export function InventoryTable({
  items,
  onEdit,
  onDelete,
  totalItems,
  currentPage,
  pageSize,
  onPageChange,
  onPageSizeChange
}: InventoryTableProps) {
  if (!items.length) {
    return (
      <div className="card empty-state">
        <p>Nenhum item encontrado com os filtros atuais.</p>
        <p>Adicione um novo item ou remova filtros para visualizar o inventário completo.</p>
      </div>
    );
  }

  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const canGoPrev = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  const columnLabels = {
    room: 'Cômodo',
    item: 'Item',
    category: 'Categoria',
    color: 'Cor',
    quantity: 'Quantidade',
    type: 'Tipo',
    status: 'Status',
    actions: 'Ações'
  };

  const pageNumbers = (() => {
    const maxButtons = 5;
    const pages: number[] = [];
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, start + maxButtons - 1);
    if (end - start < maxButtons - 1) {
      start = Math.max(1, end - maxButtons + 1);
    }
    for (let page = start; page <= end; page += 1) {
      pages.push(page);
    }
    return pages;
  })();

  return (
    <div className="card table-wrapper">
      <div className="table-scroll">
        <table className="inventory-table" aria-label="Itens do inventário">
          <thead>
            <tr>
              <th scope="col">{columnLabels.room}</th>
              <th scope="col">{columnLabels.item}</th>
              <th scope="col">{columnLabels.category}</th>
              <th scope="col">{columnLabels.color}</th>
              <th scope="col">{columnLabels.quantity}</th>
              <th scope="col">{columnLabels.type}</th>
              <th scope="col">{columnLabels.status}</th>
              <th scope="col" className="actions-header">
                {columnLabels.actions}
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td data-label={columnLabels.room}>
                  <span className="table-room">{item.room}</span>
                </td>
                <td data-label={columnLabels.item}>
                  <div className="item-name">
                    <strong>{item.name}</strong>
                    {item.notes ? <span className="item-notes">{item.notes}</span> : null}
                  </div>
                </td>
                <td data-label={columnLabels.category}>{item.category}</td>
                <td data-label={columnLabels.color}>{item.color}</td>
                <td data-label={columnLabels.quantity}>
                  <span className="quantity-badge">{item.quantity}</span>
                </td>
                <td data-label={columnLabels.type}>
                  <ApplianceChip isAppliance={item.isAppliance} />
                </td>
                <td data-label={columnLabels.status}>
                  <StatusChip purchased={item.purchased} />
                </td>
                <td className="actions" data-label={columnLabels.actions}>
                  <button
                    type="button"
                    className="icon-button icon-button--ghost"
                    onClick={() => onEdit(item)}
                    aria-label={`Editar ${item.name}`}
                  >
                    <EditIcon />
                  </button>
                  <button
                    type="button"
                    className="icon-button icon-button--danger"
                    onClick={() => onDelete(item.id)}
                    aria-label={`Remover ${item.name}`}
                  >
                    <DeleteIcon />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <footer className="table-footer">
        <div className="page-size">
          <label>
            Itens por página
            <select
              value={pageSize}
              onChange={(event) => onPageSizeChange(Number(event.target.value))}
            >
              {[5, 10, 20, 50].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="pagination">
          <button
            type="button"
            className="icon-button icon-button--ghost"
            onClick={() => onPageChange(1)}
            disabled={!canGoPrev}
            aria-label="Primeira página"
          >
            «
          </button>
          <button
            type="button"
            className="icon-button icon-button--ghost"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={!canGoPrev}
            aria-label="Página anterior"
          >
            ‹
          </button>
          <div className="pagination-pages">
            {pageNumbers.map((page) => (
              <button
                key={page}
                type="button"
                className={page === currentPage ? 'page-button active' : 'page-button'}
                onClick={() => onPageChange(page)}
                aria-current={page === currentPage ? 'page' : undefined}
              >
                {page}
              </button>
            ))}
          </div>
          <button
            type="button"
            className="icon-button icon-button--ghost"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={!canGoNext}
            aria-label="Próxima página"
          >
            ›
          </button>
          <button
            type="button"
            className="icon-button icon-button--ghost"
            onClick={() => onPageChange(totalPages)}
            disabled={!canGoNext}
            aria-label="Última página"
          >
            »
          </button>
        </div>
        <div className="page-status">
          Página {currentPage} de {totalPages}
        </div>
      </footer>
    </div>
  );
}


