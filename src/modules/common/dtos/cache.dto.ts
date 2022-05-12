import { ReserveDocumentDTO } from '@src/modules/auth/sign-up/useCases/reserve-document/dtos';
import { ReserveEmailDTO } from '@src/modules/auth/sign-up/useCases/reserve-email/dtos';
import { ReservePhoneDTO } from '@src/modules/auth/sign-up/useCases/reserve-phone/dtos';

export type CacheDTO = ReservePhoneDTO | ReserveDocumentDTO | ReserveEmailDTO;
