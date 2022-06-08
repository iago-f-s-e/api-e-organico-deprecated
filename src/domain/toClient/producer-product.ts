import { ProducerProduct } from '@src/infra/database/entities';
import { unitMeasureToClient } from '@src/modules/app/domain/unit-measure/helpers';
import { MinimalProducerProductToClient, ProducerProductToClient } from '../dtos/producer-product';

type ToClient = (producerProduct: ProducerProduct) => ProducerProductToClient;
type MinimalToClient = (producerProduct: ProducerProduct) => MinimalProducerProductToClient;

const defaultImage =
  'https://www.amigodoclima.com.br/wp-content/themes/amigodoclima/img/not-available.png';

export const minimalProducerProductToClient: MinimalToClient = producerProduct => ({
  id: producerProduct.id,
  image: defaultImage,
  name: producerProduct.product.name,
  price: producerProduct.price,
  unitMeasure: {
    name: producerProduct.unitMeasure.name
  }
});

export const producerProductToClient: ToClient = producerProduct => ({
  id: producerProduct.id,
  image: defaultImage,
  name: producerProduct.product.name,
  price: producerProduct.price,
  unitMeasure: unitMeasureToClient(producerProduct.unitMeasure),
  score: {
    transactions: producerProduct.score.transactions
  },
  stock: producerProduct.stock,
  harvestDate: new Intl.DateTimeFormat('pt-BR').format(new Date(producerProduct.harvestDate))
});
