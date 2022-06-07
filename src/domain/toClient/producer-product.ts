import { ProducerProduct } from '@src/infra/database/entities';
import { MinimalProducerProductToClient } from '../dtos/producer-product';

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
