import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { GetProducerProduct } from '@src/domain/dtos/producer-product';
import { producerProductToClient } from '@src/domain/toClient/producer-product';
import { FindProducerProductUseCase } from '../../producer-product/useCases';

@Controller(':producerId/product')
export class ProducerProductController {
  constructor(private readonly findUseCase: FindProducerProductUseCase) {}

  @Get(':id')
  public async getById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string
  ): GetProducerProduct {
    const producerProduct = await this.findUseCase.findById(id);

    if (producerProduct.isLeft()) throw producerProduct.value;

    return producerProductToClient(producerProduct.value);
  }
}
