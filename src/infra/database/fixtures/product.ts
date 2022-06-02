import { Product } from '../entities';

export const productFixtures: Omit<Product, 'isActive' | 'producerProducts'>[] = [
  {
    id: '22458937-c9f5-47b9-bf09-33906568e1ca',
    name: 'Maçã',
    type: 'Fruta'
  },
  {
    id: '9c1aac6f-1370-4841-97cd-457249ab9db8',
    name: 'Morango',
    type: 'Fruta'
  },
  {
    id: '08bf4d7f-3173-480f-b674-7969d1845ad3',
    name: 'Laranja',
    type: 'Fruta'
  },
  {
    id: '39e673a3-208e-45ed-a1b4-2d21a82685dc',
    name: 'Tangerina',
    type: 'Fruta'
  },
  {
    id: '305ed9ed-447a-4b7c-824d-42818d637d25',
    name: 'Cenoura',
    type: 'Legume'
  },
  {
    id: '0b5a72c6-4e2f-4400-9b5f-ed3aa7c24c83',
    name: 'Beterraba',
    type: 'Legume'
  },
  {
    id: 'b0a0f820-259a-4b18-ad72-a0170d935fd9',
    name: 'Pepino',
    type: 'Legume'
  },
  {
    id: '6da72c78-7adb-4f9b-bca4-7b97c41f8046',
    name: 'Pimentão',
    type: 'Legume'
  },
  {
    id: 'b56b8953-d506-4097-bc10-50b8627ed84a',
    name: 'Brócolis',
    type: 'Verdura'
  },
  {
    id: '3eaa4a10-4915-4597-90c0-b5ed63b5a2ef',
    name: 'Alface',
    type: 'Verdura'
  },
  {
    id: '4e0b5bdf-d95f-4ff5-bad7-da12c8cbba61',
    name: 'Rúcula',
    type: 'Verdura'
  }
];
