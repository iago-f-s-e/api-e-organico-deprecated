import { User } from '@src/infra/database/entities';
import { addressToClient } from '../../address/helpers';
import { producerToClient } from '../../producer/helpers';
import { UserToClientDTO } from '../dtos';

export function userToClient(data: User): UserToClientDTO {
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
