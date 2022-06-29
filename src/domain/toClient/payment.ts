import { Payment } from '@src/infra/database/entities';
import { PaymentToClient } from '../dtos/payment';

type ToClient = (payment: Payment) => PaymentToClient;

export const paymentToClient: ToClient = payment => ({
  id: payment.id,
  name: payment.name,
  type: payment.type
});
