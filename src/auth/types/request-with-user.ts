import { Request } from 'express';
import { User } from 'src/users/users.model';

export interface RequestWithUser extends Request {
  user: User;
}
