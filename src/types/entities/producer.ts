import { Producer } from '@src/infra/database/entities';
import { FindManyOptions } from 'typeorm';

export type CertificationType = 'IN CONVERSION' | 'AUDIT' | 'OCS' | 'SPG';

export type ProducerStatus = 'PENDING' | 'ACTIVE' | 'BLOCKED' | 'REJECTED';

export enum certificationType {
  'IN CONVERSION' = 'IN CONVERSION',
  'AUDIT' = 'AUDIT',
  'OCS' = 'OCS',
  'SPG' = 'SPG'
}

export type FindProducerOptions = {
  FIND_ALL: FindManyOptions<Producer>;
};
