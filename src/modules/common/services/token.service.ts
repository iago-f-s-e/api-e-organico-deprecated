import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PayloadTokenDTO } from '../dtos';
import { left, right } from '../either';
import { AuthResponse } from '../types/responses';

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
