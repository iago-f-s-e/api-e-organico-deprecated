import { Body, ConflictException, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CacheService } from '@src/modules/common/services';
import { ReserveEmailDTO } from '../dtos/reserve-document.dto';
import { ReserveEmailService } from '../service';

@Controller()
export class ReserveEmailController {
  constructor(
    private readonly cacheService: CacheService,
    private readonly service: ReserveEmailService
  ) {}

  @Post()
  @HttpCode(HttpStatus.NO_CONTENT)
  public async exec(@Body() body: ReserveEmailDTO): Promise<void> {
    const key = `@email:${body.email}`;

    const cache = await this.cacheService.get<ReserveEmailDTO>(key);

    if (!cache) {
      const reserveOrError = await this.service.exec(body, key);

      if (reserveOrError.isLeft()) throw reserveOrError.value;

      return;
    }

    if (cache.device !== body.device) throw new ConflictException('The user email already exists.');
  }
}
