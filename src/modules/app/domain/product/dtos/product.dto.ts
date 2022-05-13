import { UnitMeasureProductDTO } from '../../unit-measure-product/dtos';

export type ProductDTO = {
  id: string;
  name: string;
  type: string;
  unitMeasures: UnitMeasureProductDTO[];
};
