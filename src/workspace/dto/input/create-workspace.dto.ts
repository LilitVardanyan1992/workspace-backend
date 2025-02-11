import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateWorkspaceDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 50)
  name: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 50)
  slug: string;
}
