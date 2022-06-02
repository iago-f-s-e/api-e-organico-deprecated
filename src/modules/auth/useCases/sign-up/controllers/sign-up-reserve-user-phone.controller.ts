import { Body, ConflictException, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { RedisService } from '@src/infra/redis/services';

import { ReservePhoneDTO } from '../dtos';
import { ReserveUserPhone } from '../services';

@Controller('reserve-phone')
export class SignUpReserveUserPhoneController {
  constructor(
    private readonly cacheService: RedisService,
    private readonly service: ReserveUserPhone
  ) {}

  @Post()
  @HttpCode(HttpStatus.NO_CONTENT)
  public async exec(@Body() body: ReservePhoneDTO): Promise<void> {
    const key = `@phone:${body.phone}`;

    const cache = await this.cacheService.get<ReservePhoneDTO>(key);

    if (!cache) {
      const reserveOrError = await this.service.exec(body, key);

      if (reserveOrError.isLeft()) throw reserveOrError.value;

      return;
    }

    if (cache.device !== body.device) throw new ConflictException('The user phone already exists.');
  }
}
