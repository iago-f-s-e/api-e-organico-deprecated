import { Product } from '@src/infra/database/entities';
import { capitalize } from '@src/shared/functions';
import { ProductToClient } from '../dtos/product';

type ToClient = (product: Product) => ProductToClient;

export const productToClient: ToClient = product => ({
  id: product.id,
  name: capitalize(product.name),
  type: capitalize(product.type)
});
