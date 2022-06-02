import { UnitMeasure } from '@src/infra/database/entities';
import { UnitMeasureToClientDTO } from '../dtos';

const capitalize = (value: string): string => `${value[0]}${value.slice(1).toLowerCase()}`;

export function unitMeasureToClient(data: UnitMeasure): UnitMeasureToClientDTO {
  return {
    id: data.id,
    name: capitalize(data.name),
    abbreviation: data.abbreviation
  };
}
