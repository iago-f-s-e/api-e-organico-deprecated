import { User } from '@src/infra/database/entities';
import { UserToClient } from '../dtos/user';
import { addressToClient } from './address';
import { producerMakeDeliveryToClient } from './producer';

type ToClient = (user: User) => UserToClient;

export const userToClient: ToClient = user => {
  const isProducer = !!user.producer;
  const userType = isProducer ? 'producer' : 'consumer';

  return {
    id: user.id,
    userType,
    phone: user.phone,
    email: user.email,
    name: user.name,
    producer: isProducer ? producerMakeDeliveryToClient(user.producer) : undefined,
    address: user.address?.length ? addressToClient(user.address[0]) : undefined
  };
};
