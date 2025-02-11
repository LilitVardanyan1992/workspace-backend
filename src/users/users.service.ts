import { BadRequestException, Injectable } from '@nestjs/common';
import { CommonService } from 'libs/commons/common-service/common-service';
import { User } from './users.model';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/input/create-user.dto';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class UsersService extends CommonService<User> {
  constructor(@InjectModel(User) private userRepository: typeof User) {
    super(User);
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    createUserDto.email = createUserDto.email.toLowerCase();

    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new BadRequestException('This email is already registered.'); //UnauthorizedException
    }

    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);

    const user = await this.userRepository.create(createUserDto);
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.model.findOne({ where: { email } });
  }
}
