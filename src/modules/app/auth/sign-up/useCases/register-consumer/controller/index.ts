import { Body, Controller, Post } from '@nestjs/common';
import { CacheService } from '@src/modules/common/services';
import { User } from '@src/modules/database/entities';
import { RegisterConsumerDTO } from '../dtos';
import { RegisterConsumerService } from '../service';

@Controller()
export class RegisterConsumerController {
  constructor(
    private readonly service: RegisterConsumerService,
    private readonly cacheService: CacheService
  ) {}

  private async clearCache(user: User): Promise<void> {
    const document = `@document:${user.document}`;
    const email = `@email:${user.email}`;
    const phone = `@phone:${user.phone}`;

    this.cacheService.del(document, email, phone).catch(err => console.error(err));
  }

  @Post()
  public async exec(@Body() body: RegisterConsumerDTO): Promise<User> {
    const registerOrError = await this.service.exec(body);

    if (registerOrError.isLeft()) throw registerOrError.value;

    this.clearCache(registerOrError.value);

    return registerOrError.value;
  }
}
