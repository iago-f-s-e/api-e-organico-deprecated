import { Body, ConflictException, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CacheService } from '@src/modules/common/services';
import { ReservePhoneDTO } from '../dtos/reserve-phone.dto';
import { ReservePhoneService } from '../service';

@Controller()
export class ReservePhoneController {
  constructor(
    private readonly cacheService: CacheService,
    private readonly service: ReservePhoneService
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
