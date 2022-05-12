import { CertificationType } from '@src/modules/common/types';

export type CreateProducerDTO = {
  makeDelivery: boolean;
  certificationType: CertificationType;
};
