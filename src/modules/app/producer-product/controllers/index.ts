import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Put
} from '@nestjs/common';
import { keys } from '@src/domain/constants';
import {
  GetProducerProduct,
  MinimalProducerProductToClient
} from '@src/domain/dtos/producer-product';
import { ProducerProductDTO } from '@src/domain/dtos/producer-product/producer-product.dto';
import { CreateProducerProductModel, UpdateProducerProductModel } from '@src/domain/models/app';
import {
  minimalProducerProductToClient,
  producerProductToClient
} from '@src/domain/toClient/producer-product';
import { ProducerProduct } from '@src/infra/database/entities';
import { RedisService } from '@src/infra/redis/services';
import { Current } from '@src/modules/common/guard';
import { CurrentUser } from '@src/types/global';
import * as UseCases from '../useCases';

@Controller()
export class ProducerProductController {
  constructor(
    private readonly createUseCase: UseCases.CreateProducerProductUseCase,
    private readonly findUseCase: UseCases.FindProducerProductUseCase,
    private readonly updateUseCase: UseCases.UpdateProducerProductUseCase,
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

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() body: ProducerProductDTO,
    @Current() current: CurrentUser
  ): Promise<void> {
    const producerProduct = new UpdateProducerProductModel(body);

    const key = `producer:${current.id}@${keys.ALL_PRODUCER_PRODUCTS}`;

    await this.redisService.del(key);

    this.updateUseCase.exec(id, producerProduct.value);
  }

  @Patch(':id/inactive')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async inactive(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Current() current: CurrentUser
  ): Promise<void> {
    const key = `producer:${current.id}@${keys.ALL_PRODUCER_PRODUCTS}`;

    await this.redisService.del(key);

    this.updateUseCase.inactive(id);
  }
}
