import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common/decorators';
import { CreateUserDto } from './dto/input/create-user.dto';
import { UsersService } from './users.service';
import { User } from './users.model';
import {
  NotFoundException,
  Param,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/input/update-user.dto';

@Controller({
  version: '5',
  path: 'users',
})
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  async getUsers(
    @Query() queryParams: any,
  ): Promise<{ rows: User[]; count: number }> {
    return await this.usersService.findAndCountAll(queryParams);
  }

  @Delete(':id')
  destroy(@Param() { id }) {
    return this.usersService.delete(id);
  }

  @Get(':id')
  async getById(@Param() { id }): Promise<object> {
    const user = await this.usersService.findOne({ where: { id: id } });
    if (user) {
      const { password, ...result } = user.dataValues;
      return result;
    }
    throw new NotFoundException('User not found');
  }

  @Put(':id')
  async update(
    @Param() { id },
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<boolean> {
    return await this.usersService.update(id, updateUserDto);
  }
}
