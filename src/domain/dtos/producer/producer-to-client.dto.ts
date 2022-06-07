export type ProducerToClient = {
  makeDelivery: boolean;
};

export type MinimalProducerToClient = {
  id: string;
  name: string;
  image: string;
  score: {
    transactions: number;
    rating: number;
  };
};
