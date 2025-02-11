import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/input/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from 'src/users/users.service';
import { UserOutputDto } from 'src/users/dto/output/user-output.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOne({
      where: { email: email.toLowerCase() },
    });
  
    if (!user) {
      throw new UnauthorizedException('User not found. Please register.');
    }
  
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials. Please try again.');
    }
  
    const { password: userPassword, ...userData } = user.dataValues;
    return userData;
  }
  

  async login(email: string, password: string): Promise<any> {
    const user = await this.validateUser(email.toLowerCase(), password);

    return {
      accessToken: this.jwtService.sign(
        { sub: { id: user.id} },
        { expiresIn: '1y' },
      ),
      user,
    };
  }

  async registration(createUserDto: CreateUserDto): Promise<UserOutputDto> {
    const user = await this.userService.create(createUserDto);
    const { password, ...safeUser } = user.toJSON();
    return safeUser;
  }
}
