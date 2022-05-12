import {
  ReservePhoneDTO,
  ReserveDocumentDTO,
  ReserveEmailDTO
} from '@src/modules/auth/useCases/sign-up/dtos';

export type CacheDTO = ReservePhoneDTO | ReserveDocumentDTO | ReserveEmailDTO;
