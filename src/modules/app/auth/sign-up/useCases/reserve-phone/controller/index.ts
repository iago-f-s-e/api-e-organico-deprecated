import { Body, Controller, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
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
  public async exec(@Body() body: ReservePhoneDTO, @Param('mac') mac: string): Promise<void> {
    const key = `${mac}:phone`;

    const cache = await this.cacheService.get<ReservePhoneDTO>(key);

    if (cache) return;

    const reserveOrError = await this.service.exec(body.phone, key);

    if (reserveOrError.isLeft()) throw reserveOrError.value;
  }
}
