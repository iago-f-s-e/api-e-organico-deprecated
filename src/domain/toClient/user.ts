import { User } from '@src/infra/database/entities';
import { UserToClient } from '../dtos/user';
import { addressToClient } from './address';
import { producerToClient } from './producer';

export function userToClient(data: User): UserToClient {
  const isProducer = !!data.producer;
  const userType = isProducer ? 'producer' : 'consumer';

  return {
    id: data.id,
    userType,
    phone: data.phone,
    email: data.email,
    name: data.name,
    producer: isProducer ? producerToClient(data.producer) : undefined,
    address: data.address?.length ? addressToClient(data.address[0]) : undefined
  };
}
