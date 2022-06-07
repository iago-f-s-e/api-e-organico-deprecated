import { Score } from '@src/infra/database/entities';

export type CreateProducerProductDTO = {
  productId: string;
  unitMeasureId: string;
  price: number;
  stock: number;
  harvestDate: Date;
  score: Score;
};
