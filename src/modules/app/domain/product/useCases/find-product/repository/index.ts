import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '@src/modules/database/entities';
import { Repository } from 'typeorm';

@Injectable()
export class FindProductRepository {
  constructor(@InjectRepository(Product) private readonly reference: Repository<Product>) {}

  public existing(name: string): Promise<Product | null> {
    return this.reference.findOne({
      where: { name },
      select: { id: true, isActive: true }
    });
  }
}
