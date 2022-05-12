import { Body, ConflictException, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CacheService } from '@src/modules/common/services';
import { ReserveDocumentDTO } from '../dtos/reserve-document.dto';
import { ReserveDocumentService } from '../service';

@Controller()
export class ReserveDocumentController {
  constructor(
    private readonly cacheService: CacheService,
    private readonly service: ReserveDocumentService
  ) {}

  @Post()
  @HttpCode(HttpStatus.NO_CONTENT)
  public async exec(@Body() body: ReserveDocumentDTO): Promise<void> {
    const key = `@document:${body.document}`;

    const cache = await this.cacheService.get<ReserveDocumentDTO>(key);

    if (!cache) {
      const reserveOrError = await this.service.exec(body, key);

      if (reserveOrError.isLeft()) throw reserveOrError.value;

      return;
    }

    if (cache.device !== body.device)
      throw new ConflictException('The user document already exists.');
  }
}
