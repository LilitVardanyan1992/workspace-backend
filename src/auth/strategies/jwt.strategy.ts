import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as process from 'node:process';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/users.model';
import { UserOutputDto } from 'src/users/dto/output/user-output.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_KEY || 'SECRET',
    });
  }

  async validate(payload: any): Promise<UserOutputDto> {
    if (!payload.sub || !payload.sub.id) {
      throw new UnauthorizedException('Invalid token payload');
    }
    const user = await this.userService.findOne({
      where: { id: payload.sub?.id },
    });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    const { password, ...safeUser } = user.toJSON();
    return safeUser;
  }
}
