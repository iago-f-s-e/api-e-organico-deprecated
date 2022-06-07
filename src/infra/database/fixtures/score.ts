import { Score } from '../entities';

export const scoreFixtures: Omit<Score, 'user' | 'market' | 'producerProduct'>[] = [
  {
    id: 'ab3769a8-ce95-41f9-be3d-1d92679d9112',
    userId: '90baed0b-6c04-401a-92d7-94641228d008', // !produtor
    marketId: null as unknown as string,
    producerProductId: null as unknown as string,
    rating: 4.77,
    ratingQuantity: 45,
    totalRating: 215,
    transactions: 56
  },
  {
    id: '2f78694d-cb8c-4f11-a0c2-19cb43112220',
    userId: '8302f435-243a-480b-a7a3-2a0aaab0c27d', // !consumidor
    marketId: null as unknown as string,
    producerProductId: null as unknown as string,
    rating: 4.33,
    ratingQuantity: 15,
    totalRating: 65,
    transactions: 20
  },
  {
    id: '3b0c83a4-9a47-4832-a486-83e1257cc93b',
    producerProductId: '1583e0da-37f4-4303-a28a-c75aa4535323',
    userId: null as unknown as string,
    marketId: null as unknown as string,
    rating: 0,
    ratingQuantity: 0,
    totalRating: 0,
    transactions: 56
  },
  {
    id: '5187f5d1-9e38-425e-bbd4-8b7442374b3e',
    marketId: '66ac5b51-8b01-4a70-8472-00f863c0acf4',
    userId: null as unknown as string,
    producerProductId: null as unknown as string,
    rating: 0,
    ratingQuantity: 0,
    totalRating: 0,
    transactions: 56
  }
];
