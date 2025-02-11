import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'Email should be a valid email address' })
  readonly email: string;

  @IsString({ message: 'Password must be a string' })
  readonly password: string;
}
