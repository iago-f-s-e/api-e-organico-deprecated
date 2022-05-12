import { RegisterConsumerDTO } from '@src/modules/auth/sign-up/useCases/register-consumer/dtos';
import { RegisterProducerDTO } from '@src/modules/auth/sign-up/useCases/register-producer/dtos';

export type CreateUserDTO = RegisterConsumerDTO | RegisterProducerDTO;
