import { CreateUnitMeasureProductDTO } from '@src/modules/app/domain/unit-measure-product/useCases/create-unit-measure-product/dtos';

export type CreateProductDTO = {
  name: string;
  type: string;
  unitMeasureProducts: CreateUnitMeasureProductDTO[];
};
