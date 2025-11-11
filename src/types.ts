export type Room =
  | 'Banheiro'
  | 'Quarto'
  | 'Cozinha'
  | 'Sala'
  | 'Escritório'
  | 'Lavanderia'
  | 'Churrasqueira';

export interface InventoryItem {
  id: string;
  name: string;
  color: string;
  quantity: number;
  room: Room;
  category: string;
  isAppliance: boolean;
  purchased: boolean;
  notes?: string;
}

export type InventoryDraft = Omit<InventoryItem, 'id'>;


