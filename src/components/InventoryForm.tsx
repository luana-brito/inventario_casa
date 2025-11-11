import { useEffect, useState } from 'react';
import type { InventoryDraft, InventoryItem, Room } from '../types.ts';

interface InventoryFormProps {
  rooms: Room[];
  onSubmit: (draft: InventoryDraft, id?: string) => void;
  onCancelEdit: () => void;
  onClose: () => void;
  editingItem: InventoryItem | null;
}

const emptyDraft: InventoryDraft = {
  name: '',
  color: '',
  quantity: 1,
  room: 'Banheiro',
  category: '',
  isAppliance: false,
  purchased: false,
  notes: ''
};

const createEmptyDraft = (): InventoryDraft => ({ ...emptyDraft });

export function InventoryForm({ rooms, onSubmit, onCancelEdit, onClose, editingItem }: InventoryFormProps) {
  const [form, setForm] = useState<InventoryDraft>(() => createEmptyDraft());

  useEffect(() => {
    if (editingItem) {
      const { id: _id, ...rest } = editingItem;
      setForm({ ...rest });
    } else {
      setForm(createEmptyDraft());
    }
  }, [editingItem]);

  function handleChange<K extends keyof InventoryDraft>(key: K, value: InventoryDraft[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form.name.trim()) {
      return;
    }
    onSubmit(
      {
        ...form,
        name: form.name.trim(),
        color: form.color.trim(),
        category: form.category.trim(),
        notes: form.notes?.trim() ?? ''
      },
      editingItem?.id
    );
    onClose();
  }

  const isEditing = Boolean(editingItem);

  return (
    <form className="card form-card" onSubmit={handleSubmit}>
      <header>
        <h2 id="inventory-form-title">{isEditing ? 'Editar item' : 'Adicionar item'}</h2>
        <div className="form-header-actions">
          {isEditing && (
            <button type="button" className="ghost-button" onClick={onCancelEdit}>
              Cancelar edição
            </button>
          )}
          <button type="button" className="ghost-button" onClick={onClose} aria-label="Fechar formulário">
            Fechar
          </button>
        </div>
      </header>

      <div className="form-grid">
        <label>
          Nome do item
          <input
            type="text"
            value={form.name}
            placeholder="Ex.: Toalha de banho"
            onChange={(event) => handleChange('name', event.target.value)}
            required
          />
        </label>

        <label>
          Cor
          <input
            type="text"
            value={form.color}
            placeholder="Ex.: Cinza escuro"
            onChange={(event) => handleChange('color', event.target.value)}
            required
          />
        </label>

        <label>
          Quantidade
          <input
            type="number"
            min={1}
            value={form.quantity}
            onChange={(event) => handleChange('quantity', Number(event.target.value))}
            required
          />
        </label>

        <label>
          Cômodo
          <select value={form.room} onChange={(event) => handleChange('room', event.target.value as Room)}>
            {rooms.map((room) => (
              <option key={room} value={room}>
                {room}
              </option>
            ))}
          </select>
        </label>

        <label>
          Categoria
          <input
            type="text"
            value={form.category}
            placeholder="Ex.: Banho, Limpeza..."
            onChange={(event) => handleChange('category', event.target.value)}
            required
          />
        </label>

        <label className="checkbox">
          <input
            type="checkbox"
            checked={form.isAppliance}
            onChange={(event) => handleChange('isAppliance', event.target.checked)}
          />
          Eletrodoméstico
        </label>

        <label className="checkbox">
          <input
            type="checkbox"
            checked={form.purchased}
            onChange={(event) => handleChange('purchased', event.target.checked)}
          />
          Já comprado
        </label>
      </div>

      <label>
        Observações
        <textarea
          value={form.notes ?? ''}
          placeholder="Detalhes extras, estado de conservação etc."
          onChange={(event) => handleChange('notes', event.target.value)}
          rows={3}
        />
      </label>

      <footer>
        <button type="submit" className="primary-button">
          {isEditing ? 'Salvar alterações' : 'Adicionar ao inventário'}
        </button>
      </footer>
    </form>
  );
}

