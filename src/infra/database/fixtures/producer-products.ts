import { ProducerProduct } from '../entities';

export const producerProductFixtures: Omit<
  ProducerProduct,
  'isActive' | 'unitMeasure' | 'product' | 'producer' | 'score' | 'transactionProducts'
>[] = [
  {
    id: '1583e0da-37f4-4303-a28a-c75aa4535323',
    producerId: '90baed0b-6c04-401a-92d7-94641228d008',
    productId: '22458937-c9f5-47b9-bf09-33906568e1ca',
    unitMeasureId: 'f6820857-afec-4cf1-a2c6-01fca0fb572c',
    harvestDate: new Date(),
    price: 9.99,
    stock: 100
  }
];
