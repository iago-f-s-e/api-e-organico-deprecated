import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { keys } from '@src/domain/constants';
import {
  GetProducerProduct,
  MinimalProducerProductToClient
} from '@src/domain/dtos/producer-product';
import { ProducerProductDTO } from '@src/domain/dtos/producer-product/producer-product.dto';
import { CreateProducerProductModel } from '@src/domain/models/app';
import {
  minimalProducerProductToClient,
  producerProductToClient
} from '@src/domain/toClient/producer-product';
import { ProducerProduct } from '@src/infra/database/entities';
import { RedisService } from '@src/infra/redis/services';
import { Current } from '@src/modules/common/guard';
import { CurrentUser } from '@src/types/global';
import { CreateProducerProductUseCase, FindProducerProductUseCase } from '../useCases';

@Controller()
export class ProducerProductController {
  constructor(
    private readonly createUseCase: CreateProducerProductUseCase,
    private readonly findUseCase: FindProducerProductUseCase,
    private readonly redisService: RedisService
  ) {}

  @Post()
  public async create(@Body() body: ProducerProductDTO): Promise<ProducerProduct> {
    const producerProduct = new CreateProducerProductModel(body);

    const createOrError = await this.createUseCase.exec(producerProduct.value);

    if (createOrError.isLeft()) throw createOrError.value;

    return createOrError.value;
  }

  @Get()
  public async findOwnProduct(@Current() current: CurrentUser): GetProducerProduct {
    const key = `producer:${current.id}@${keys.ALL_PRODUCER_PRODUCTS}`;

    const cache = await this.redisService.get<MinimalProducerProductToClient[]>(key);

    if (cache) return cache;

    const producerProducts = (await this.findUseCase.findByProducerId(current.id)).map(
      producerProduct => minimalProducerProductToClient(producerProduct)
    );

    this.redisService.set(key, producerProducts);

    return producerProducts;
  }

  @Get(':id')
  public async getById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string
  ): GetProducerProduct {
    const producerProduct = await this.findUseCase.findById(id);

    if (producerProduct.isLeft()) throw producerProduct.value;

    return producerProductToClient(producerProduct.value);
  }
}
