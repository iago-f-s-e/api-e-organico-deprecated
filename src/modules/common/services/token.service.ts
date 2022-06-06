import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { left, right } from '@src/shared/either';
import { AuthResponse } from '@src/types/responses';
import { PayloadTokenDTO } from '../dtos';

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  public generate(payload: PayloadTokenDTO): string {
    return this.jwtService.sign(JSON.parse(JSON.stringify(payload)));
  }

  public verify(accessToken?: string): AuthResponse<PayloadTokenDTO> {
    if (!accessToken) return left(new UnauthorizedException());

    const [prefix, token] = accessToken.split(' ');

    if (prefix !== 'Bearer') return left(new UnauthorizedException());

    try {
      const verified = this.jwtService.verify<PayloadTokenDTO>(token);

      const payload: PayloadTokenDTO = {
        id: verified.id
      };

      return right(payload);
    } catch (_) {
      return left(new UnauthorizedException());
    }
  }
}
