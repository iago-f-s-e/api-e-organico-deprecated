import { Controller, Get } from '@nestjs/common';
import { keys } from '@src/domain/constants';
import { GetProduct, ProductToClient } from '@src/domain/dtos/product';
import { productToClient } from '@src/domain/toClient';
import { RedisService } from '@src/infra/redis/services';
import { FindProductUseCase } from '../useCases';

@Controller()
export class ProductController {
  constructor(
    private readonly findUseCase: FindProductUseCase,
    private readonly redisService: RedisService
  ) {}

  @Get()
  public async getAll(): GetProduct {
    const cache = await this.redisService.get<ProductToClient[]>(keys.ALL_PRODUCTS);

    if (cache) return cache;

    const products = (await this.findUseCase.exec()).map(product => productToClient(product));

    this.redisService.set(keys.ALL_PRODUCTS, products);

    return products;
  }
}
