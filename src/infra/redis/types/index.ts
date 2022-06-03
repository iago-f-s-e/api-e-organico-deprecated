import { MarketToClient } from '@src/domain/dtos/market';
import { ProductToClient } from '@src/domain/dtos/product';
import {
  ReserveDocumentDTO,
  ReserveEmailDTO,
  ReservePhoneDTO
} from '@src/modules/auth/useCases/sign-up/dtos';

export type CachePayload =
  | ReservePhoneDTO
  | ReserveDocumentDTO
  | ReserveEmailDTO
  | MarketToClient[]
  | ProductToClient[];

export type HasAndDelResponse = 1 | 0;
