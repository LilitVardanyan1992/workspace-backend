import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: 'Email should be a valid email address' })
  email: string;

  @IsString({ message: 'Password must be a string.' })
  @Length(8, undefined, {
    message: 'Password must be at least 8 characters long.',
  })
  password: string;

  @IsString()
  @IsOptional()
  fullName?: string;
}
