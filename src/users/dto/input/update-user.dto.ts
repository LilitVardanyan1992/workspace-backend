import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateUserDto {
  @Length(8, undefined, {
    message: 'Password must be longer than 8 characters.',
  })
  @IsOptional()
  password?: string;

  @IsString()
  @IsOptional()
  fullName?: string | null;
}
