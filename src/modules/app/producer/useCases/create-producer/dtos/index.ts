import { CertificationType } from '@src/types/entities';

export type CreateProducerDTO = {
  makeDelivery: boolean;
  certificationType: CertificationType;
};
