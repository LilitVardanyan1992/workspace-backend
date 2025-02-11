import { Expose } from 'class-transformer';
import { UserOutputDto } from 'src/users/dto/output/user-output.dto';

export class AuthOutputDto {
  @Expose()
  accessToken: string;

  @Expose()
  user: UserOutputDto;
}
