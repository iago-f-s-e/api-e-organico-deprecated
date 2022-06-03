import { Workday } from '@src/infra/database/entities';
import { WorkdayToClient } from '../dtos/workday';

type ToClient = (workday: Workday) => WorkdayToClient;

export const workdayToClient: ToClient = ({ id, weekday, opening, closing }) => ({
  id,
  weekday,
  opening,
  closing
});
