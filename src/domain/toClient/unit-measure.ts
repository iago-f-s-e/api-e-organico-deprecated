import { UnitMeasure } from '@src/infra/database/entities';
import { capitalize } from '@src/shared/functions';
import { UnitMeasureToClient } from '../dtos/unit-measure';

type ToClient = (unitMeasure: UnitMeasure) => UnitMeasureToClient;

export const unitMeasureToClient: ToClient = unitMeasure => ({
  id: unitMeasure.id,
  name: capitalize(unitMeasure.name),
  abbreviation: unitMeasure.abbreviation
});
