import { MarketToClient } from '@src/domain/dtos/market';
import {
  ReserveDocumentDTO,
  ReserveEmailDTO,
  ReservePhoneDTO
} from '@src/modules/auth/useCases/sign-up/dtos';

export type CachePayload =
  | ReservePhoneDTO
  | ReserveDocumentDTO
  | ReserveEmailDTO
  | MarketToClient[];

export type HasAndDelResponse = 1 | 0;
