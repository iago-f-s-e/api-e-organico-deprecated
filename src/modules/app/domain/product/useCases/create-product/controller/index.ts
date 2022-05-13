import { Body, Controller, Post } from '@nestjs/common';
import { Product } from '@src/modules/database/entities';
import { ProductDTO } from '../../../dtos';
import { ValidateToCreateProduct } from '../entity';
import { CreateProductService } from '../service';

@Controller()
export class CreateProductController {
  constructor(private readonly createService: CreateProductService) {}

  @Post()
  public async exec(@Body() body: ProductDTO): Promise<Product> {
    const product = new ValidateToCreateProduct(body);

    const createOrError = await this.createService.exec(product.value);

    if (createOrError.isLeft()) throw createOrError.value;

    return createOrError.value;
  }
}
