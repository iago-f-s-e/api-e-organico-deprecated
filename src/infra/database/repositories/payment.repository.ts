import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from '../entities';

@Injectable()
export class PaymentRepository {
  constructor(@InjectRepository(Payment) private readonly payment: Repository<Payment>) {}

  public findAll(): Promise<Payment[]> {
    return this.payment.find();
  }
}
