import { UnitMeasureToClientDTO } from '../../unit-measure/dtos';

export type ProductToClientDTO = {
  id: string;
  name: string;
  type: string;
  unitMeasures: UnitMeasureToClientDTO[];
};
