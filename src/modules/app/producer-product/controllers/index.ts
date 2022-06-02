import { Body, Controller, Post } from '@nestjs/common';
import { ProducerProductDTO } from '@src/domain/dtos/producer-product/producer-product.dto';
import { CreateProducerProductModel } from '@src/domain/models/app';
import { ProducerProduct } from '@src/infra/database/entities';
import { CreateProducerProductUseCase } from '../useCases';

@Controller()
export class ProducerProductController {
  constructor(private readonly createUseCase: CreateProducerProductUseCase) {}

  @Post()
  public async create(@Body() body: ProducerProductDTO): Promise<ProducerProduct> {
    const producerProduct = new CreateProducerProductModel(body);

    const createOrError = await this.createUseCase.exec(producerProduct.value);

    if (createOrError.isLeft()) throw createOrError.value;

    return createOrError.value;
  }
}
