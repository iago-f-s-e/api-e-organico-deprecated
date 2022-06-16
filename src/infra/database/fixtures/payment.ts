import { Payment } from '../entities';

export const paymentFixtures: Omit<Payment, 'transactions'>[] = [
  {
    id: '49842e23-067d-4dfb-9719-1c255a480a8f',
    name: 'Dinheiro',
    type: 'in-person'
  },
  {
    id: '59d50e1e-2517-4769-86f1-ed6c4caf72a0',
    name: 'Pix',
    type: 'in-person'
  },
  {
    id: '6a09caee-becd-4807-ba74-e7ab2575fa6b',
    name: 'Cartão crédito',
    type: 'in-person'
  },
  {
    id: '69791738-6954-45dc-b123-e7417b0f091a',
    name: 'Cartão débito',
    type: 'in-person'
  }
];
