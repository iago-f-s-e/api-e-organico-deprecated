import { UnitMeasureToClient } from '../unit-measure';

export type MinimalProducerProductToClient = {
  id: string;
  image: string;
  name: string;
  price: number;
  stock: number;
  unitMeasure: {
    name: string;
  };
};

export type ProducerProductToClient = MinimalProducerProductToClient & {
  unitMeasure: UnitMeasureToClient;
  stock: number;
  harvestDate: string;
  score: {
    transactions: number;
  };
};
