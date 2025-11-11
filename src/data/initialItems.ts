import type { InventoryItem } from '../types.ts';

type InventorySeed = Omit<InventoryItem, 'purchased'> & { purchased?: boolean };

const inventorySeeds: InventorySeed[] = [
  {
    id: 'item-01',
    name: 'Toalha banho da boa',
    color: 'Cinza escuro',
    quantity: 2,
    room: 'Banheiro',
    category: 'Banho',
    isAppliance: false,
    purchased: true
  },
  {
    id: 'item-02',
    name: 'Toalha de rosto da boa',
    color: 'Cinza escuro',
    quantity: 1,
    room: 'Banheiro',
    category: 'Banho',
    isAppliance: false,
    purchased: true
  },
  {
    id: 'item-03',
    name: 'Toalha banho macia',
    color: 'Cinza',
    quantity: 2,
    room: 'Banheiro',
    category: 'Banho',
    isAppliance: false,
    purchased: true
  },
  {
    id: 'item-04',
    name: 'Toalha de rosto macia',
    color: 'Cinza',
    quantity: 1,
    room: 'Banheiro',
    category: 'Banho',
    isAppliance: false,
    purchased: true
  },
  {
    id: 'item-05',
    name: 'Toalha banho macia',
    color: 'Azul marinho',
    quantity: 2,
    room: 'Banheiro',
    category: 'Banho',
    isAppliance: false,
    purchased: true
  },
  {
    id: 'item-06',
    name: 'Toalha de rosto macia',
    color: 'Azul marinho',
    quantity: 1,
    room: 'Banheiro',
    category: 'Banho',
    isAppliance: false,
    purchased: true
  },
  {
    id: 'item-07',
    name: 'Toalha de rosto visita',
    color: 'Verde',
    quantity: 2,
    room: 'Banheiro',
    category: 'Banho',
    isAppliance: false,
    purchased: true
  },
  {
    id: 'item-08',
    name: 'Toalha visita',
    color: 'Verde',
    quantity: 1,
    room: 'Banheiro',
    category: 'Banho',
    isAppliance: false,
    purchased: true
  },
  {
    id: 'item-09',
    name: 'Tapete felpudo para banheiro',
    color: 'Cinza escuro',
    quantity: 2,
    room: 'Banheiro',
    category: 'Banho',
    isAppliance: false,
    purchased: true
  },
  {
    id: 'item-10',
    name: 'Tapete felpudo para banheiro',
    color: 'Azul marinho',
    quantity: 2,
    room: 'Banheiro',
    category: 'Banho',
    isAppliance: false,
    purchased: true
  },
  {
    id: 'item-11',
    name: 'Tapete antiderrapante para box',
    color: 'Transparente',
    quantity: 2,
    room: 'Banheiro',
    category: 'Banho',
    isAppliance: false,
    purchased: true
  },
  {
    id: 'item-12',
    name: 'Tapete porta de entrada',
    color: 'Fibra natural',
    quantity: 1,
    room: 'Sala',
    category: 'Decoração',
    isAppliance: false,
    purchased: true
  },
  {
    id: 'item-13',
    name: 'Pano de pia',
    color: 'Branco',
    quantity: 2,
    room: 'Cozinha',
    category: 'Cozinha',
    isAppliance: false,
    purchased: true
  },
  {
    id: 'item-14',
    name: 'Cesto para pregadores',
    color: 'Cinza',
    quantity: 1,
    room: 'Lavanderia',
    category: 'Organização',
    isAppliance: false,
    purchased: true
  },
  {
    id: 'item-15',
    name: 'Pregadores de roupa',
    color: 'Cinza claro e escuro',
    quantity: 72,
    room: 'Lavanderia',
    category: 'Organização',
    isAppliance: false,
    purchased: true
  },
  {
    id: 'item-16',
    name: 'Varal para box',
    color: 'Branco',
    quantity: 1,
    room: 'Banheiro',
    category: 'Organização',
    isAppliance: false,
    purchased: true
  },
  {
    id: 'item-17',
    name: 'Lixeiro de banheiro',
    color: 'Inox',
    quantity: 2,
    room: 'Banheiro',
    category: 'Organização',
    isAppliance: false,
    purchased: true
  },
  {
    id: 'item-18',
    name: 'Baldes dobráveis',
    color: 'Cinza e verde pastel',
    quantity: 2,
    room: 'Lavanderia',
    category: 'Limpeza',
    isAppliance: false,
    purchased: true
  },
  {
    id: 'item-19',
    name: 'Escova limpa privada',
    color: 'Inox',
    quantity: 2,
    room: 'Banheiro',
    category: 'Higiene',
    isAppliance: false,
    purchased: true
  },
  {
    id: 'item-20',
    name: 'Mop Flash Limp',
    color: 'Cinza claro e verde água',
    quantity: 1,
    room: 'Lavanderia',
    category: 'Limpeza',
    isAppliance: false,
    purchased: true
  },
  {
    id: 'item-21',
    name: 'Refil microfibra para mop',
    color: 'Cinza claro',
    quantity: 2,
    room: 'Lavanderia',
    category: 'Limpeza',
    isAppliance: false,
    purchased: true
  },
  {
    id: 'item-22',
    name: 'Escova multiuso para sapato',
    color: 'Branca e terracota',
    quantity: 1,
    room: 'Lavanderia',
    category: 'Limpeza',
    isAppliance: false,
    purchased: true
  },
  {
    id: 'item-23',
    name: 'Vassoura de pelos',
    color: 'Caramelo',
    quantity: 1,
    room: 'Lavanderia',
    category: 'Limpeza',
    isAppliance: false,
    purchased: true
  },
  {
    id: 'item-24',
    name: 'Pá dobrável',
    color: 'Cinza',
    quantity: 1,
    room: 'Lavanderia',
    category: 'Limpeza',
    isAppliance: false,
    purchased: true
  },
  {
    id: 'item-25',
    name: 'Ferro de passar a vapor',
    color: 'Branco e verde pastel',
    quantity: 1,
    room: 'Lavanderia',
    category: 'Passadoria',
    isAppliance: true,
    purchased: true
  },
  {
    id: 'item-26',
    name: 'Protetor de colchão impermeável (Queen)',
    color: 'Branco',
    quantity: 1,
    room: 'Quarto',
    category: 'Enxoval',
    isAppliance: false,
    purchased: true
  },
  {
    id: 'item-27',
    name: 'Jogo de cama com lençol e fronhas',
    color: 'Branco',
    quantity: 2,
    room: 'Quarto',
    category: 'Enxoval',
    isAppliance: false,
    purchased: true
  },
  {
    id: 'item-28',
    name: 'Cabide de veludo',
    color: 'Preto',
    quantity: 32,
    room: 'Quarto',
    category: 'Organização',
    isAppliance: false,
    purchased: true
  },
  {
    id: 'item-29',
    name: 'Travesseiro',
    color: 'Branco',
    quantity: 2,
    room: 'Quarto',
    category: 'Enxoval',
    isAppliance: false,
    purchased: true
  },
  {
    id: 'item-30',
    name: 'Travesseiro visita',
    color: 'Branco',
    quantity: 1,
    room: 'Quarto',
    category: 'Enxoval',
    isAppliance: false,
    purchased: true
  },
  {
    id: 'item-31',
    name: 'Fronha visita',
    color: 'Branco',
    quantity: 1,
    room: 'Quarto',
    category: 'Enxoval',
    isAppliance: false,
    purchased: true
  },
  {
    id: 'item-32',
    name: 'Amassador de alho',
    color: 'Preto e inox',
    quantity: 1,
    room: 'Cozinha',
    category: 'Utensílios',
    isAppliance: false,
    purchased: true
  },
  {
    id: 'item-33',
    name: 'Forma de gelo',
    color: 'Transparente e azul marinho',
    quantity: 2,
    room: 'Cozinha',
    category: 'Utensílios',
    isAppliance: false,
    purchased: true
  },
  {
    id: 'item-34',
    name: 'Copo medidor',
    color: 'Transparente',
    quantity: 1,
    room: 'Cozinha',
    category: 'Utensílios',
    isAppliance: false,
    purchased: true
  },
  {
    id: 'item-35',
    name: 'Grampo de embalagem',
    color: 'Cores pastéis',
    quantity: 1,
    room: 'Cozinha',
    category: 'Organização',
    isAppliance: false,
    purchased: true
  },
  {
    id: 'item-36',
    name: 'Rodo de pia',
    color: 'Azul marinho e branco',
    quantity: 1,
    room: 'Cozinha',
    category: 'Limpeza',
    isAppliance: false,
    purchased: true
  },
  {
    id: 'item-37',
    name: 'Garrafa de vidro para geladeira',
    color: 'Transparente',
    quantity: 1,
    room: 'Cozinha',
    category: 'Armazenamento',
    isAppliance: false,
    purchased: true
  },
  {
    id: 'item-38',
    name: 'Ralador de alimentos',
    color: 'Verde pastel e transparente',
    quantity: 1,
    room: 'Cozinha',
    category: 'Utensílios',
    isAppliance: false,
    purchased: true
  },
  {
    id: 'item-39',
    name: 'Supla jogo americano',
    color: 'Cinza escuro',
    quantity: 6,
    room: 'Cozinha',
    category: 'Mesa posta',
    isAppliance: false,
    purchased: true
  },
  {
    id: 'item-40',
    name: 'Cesto para talheres de churrasco',
    color: 'Bambu natural',
    quantity: 1,
    room: 'Churrasqueira',
    category: 'Organização',
    isAppliance: false,
    purchased: true
  },
  {
    id: 'item-41',
    name: 'Pegador de macarrão',
    color: 'Inox',
    quantity: 1,
    room: 'Cozinha',
    category: 'Utensílios',
    isAppliance: false,
    purchased: true
  },
  {
    id: 'item-42',
    name: 'Pegador de salada',
    color: 'Inox',
    quantity: 1,
    room: 'Cozinha',
    category: 'Utensílios',
    isAppliance: false,
    purchased: true
  },
  {
    id: 'item-43',
    name: 'Concha de inox',
    color: 'Inox',
    quantity: 1,
    room: 'Cozinha',
    category: 'Utensílios',
    isAppliance: false,
    purchased: true
  },
  {
    id: 'item-44',
    name: 'Colher de servir',
    color: 'Inox',
    quantity: 3,
    room: 'Cozinha',
    category: 'Utensílios',
    isAppliance: false,
    purchased: true
  },
  {
    id: 'item-45',
    name: 'Colher de sorvete',
    color: 'Inox',
    quantity: 1,
    room: 'Cozinha',
    category: 'Utensílios',
    isAppliance: false,
    purchased: true
  },
  {
    id: 'item-46',
    name: 'Abridor de garrafa',
    color: 'Inox',
    quantity: 2,
    room: 'Cozinha',
    category: 'Utensílios',
    isAppliance: false,
    purchased: true
  },
  {
    id: 'item-47',
    name: 'Colher de suco',
    color: 'Inox',
    quantity: 1,
    room: 'Cozinha',
    category: 'Utensílios',
    isAppliance: false,
    purchased: true
  },
  {
    id: 'item-48',
    name: 'Cortador de bolo',
    color: 'Inox',
    quantity: 1,
    room: 'Cozinha',
    category: 'Utensílios',
    isAppliance: false,
    purchased: true
  },
  {
    id: 'item-49',
    name: 'Kit facas de cozinha',
    color: 'Inox',
    quantity: 4,
    room: 'Cozinha',
    category: 'Utensílios',
    isAppliance: false,
    purchased: true
  },
  {
    id: 'item-50',
    name: 'Peneira de inox',
    color: 'Inox',
    quantity: 1,
    room: 'Cozinha',
    category: 'Utensílios',
    isAppliance: false,
    purchased: true
  },
  {
    id: 'item-51',
    name: 'Garfos de mesa',
    color: 'Inox',
    quantity: 9,
    room: 'Cozinha',
    category: 'Talheres',
    isAppliance: false,
    purchased: true
  },
  {
    id: 'item-52',
    name: 'Colheres de chá',
    color: 'Inox',
    quantity: 9,
    room: 'Cozinha',
    category: 'Talheres',
    isAppliance: false,
    purchased: true
  },
  {
    id: 'item-53',
    name: 'Facas de mesa',
    color: 'Inox',
    quantity: 9,
    room: 'Cozinha',
    category: 'Talheres',
    isAppliance: false,
    purchased: true
  },
  {
    id: 'item-54',
    name: 'Colheres de sopa',
    color: 'Inox',
    quantity: 6,
    room: 'Cozinha',
    category: 'Talheres',
    isAppliance: false,
    purchased: true
  },
  {
    id: 'item-55',
    name: 'Copos de vidro',
    color: 'Transparente',
    quantity: 12,
    room: 'Cozinha',
    category: 'Vidros',
    isAppliance: false,
    purchased: true
  },
  {
    id: 'item-56',
    name: 'Frigideira grande',
    color: 'Preto',
    quantity: 1,
    room: 'Cozinha',
    category: 'Panelas',
    isAppliance: false,
    purchased: true
  },
  {
    id: 'item-57',
    name: 'Potes plásticos quadrados',
    color: 'Transparente e branco',
    quantity: 3,
    room: 'Cozinha',
    category: 'Armazenamento',
    isAppliance: false,
    purchased: true
  },
  {
    id: 'item-58',
    name: 'Marinex grande de vidro',
    color: 'Transparente e branco',
    quantity: 1,
    room: 'Cozinha',
    category: 'Vidros',
    isAppliance: false,
    purchased: true
  },
  {
    id: 'item-59',
    name: 'Marinex pequena de vidro',
    color: 'Transparente e branco',
    quantity: 2,
    room: 'Cozinha',
    category: 'Vidros',
    isAppliance: false,
    purchased: true
  },
  {
    id: 'item-60',
    name: 'Escorredor de macarrão',
    color: 'Inox',
    quantity: 1,
    room: 'Cozinha',
    category: 'Utensílios',
    isAppliance: false,
    purchased: true
  },
  {
    id: 'item-61',
    name: 'Forma de bolo com furo',
    color: 'Preto',
    quantity: 1,
    room: 'Cozinha',
    category: 'Utensílios',
    isAppliance: false,
    purchased: true
  },
  {
    id: 'item-62',
    name: 'Xícaras grandes',
    color: 'Preto fosco',
    quantity: 2,
    room: 'Cozinha',
    category: 'Louças',
    isAppliance: false,
    purchased: true
  },
  {
    id: 'item-63',
    name: 'Jogo de panelas',
    color: 'Preto',
    quantity: 10,
    room: 'Cozinha',
    category: 'Panelas',
    isAppliance: false,
    purchased: true
  },
  {
    id: 'item-64',
    name: 'Panela de pressão',
    color: 'Preto',
    quantity: 1,
    room: 'Cozinha',
    category: 'Panelas',
    isAppliance: false,
    purchased: true
  }
];

export const initialItems: InventoryItem[] = inventorySeeds.map((item) => ({
  ...item,
  purchased: item.purchased ?? false
}));


