import { Exclude, Expose } from 'class-transformer';

export class UserOutputDto {
  @Expose()
  id: number;

  @Expose()
  email: string;

  @Expose()
  fullName: string;
}
