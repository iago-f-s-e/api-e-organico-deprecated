import { CertificationType } from '@src/modules/database/entities';
import { RegisterConsumerDTO } from '../../register-consumer/dtos';

type ProducerDTO = {
  makeDelivery: boolean;
  certificationType: CertificationType;
};

export type RegisterProducerDTO = RegisterConsumerDTO & { producer: ProducerDTO };
