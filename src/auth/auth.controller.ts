import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/input/create-user.dto';
import { AuthService } from './auth.service';
import { Public } from 'libs/commons/decorators/public-decorator';
import { RequestWithUser } from './types/request-with-user';
import { LoginDto } from './dto/input/login.dto';
import { AuthOutputDto } from './dto/output/auth-output.dto';
import { UserOutputDto } from 'src/users/dto/output/user-output.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<AuthOutputDto> {
    return this.authService.login(loginDto.email, loginDto.password);
  }

  @Public()
  @Post('/sign-up')
  registration(@Body() createUserDto: CreateUserDto): Promise<UserOutputDto> {
    return this.authService.registration(createUserDto);
  }

  @Get('/me')
  getAuthUser(@Req() req: RequestWithUser): UserOutputDto {
    return req.user;
  }
}
