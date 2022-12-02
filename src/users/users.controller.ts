import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateCategoryDto } from '../news/categories/dto/update-category.dto';
import { CategoriesEntity } from '../news/categories/entities/category.entity';
import { UsersEntity } from './entities/users.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiTags('users')
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 201,
    description: 'create user',
    type:UsersEntity
  })
  async createUser(@Body() createUserDto: CreateUserDto):Promise<UsersEntity> {
    return await this.usersService.createUser({
      ...createUserDto
    });
  }

  @Get()
  @ApiTags('users')
  @ApiResponse({
    status: 200,
    description: 'get all users',
    type:[UsersEntity]
  })
  async getUsers():Promise<UsersEntity[]> {
    return await this.usersService.getUsers();
  }

  @Get(':id')
  @ApiTags('users')
  @ApiResponse({
    status: 200,
    description: 'get user by id',
    type:UsersEntity
  })
  async getUser(@Param('id') id: number):Promise<UsersEntity> {
    return await this.usersService.getUserById(id);
  }


  @Patch(':id')
  @ApiTags('users')
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({
    status: 200,
    description: 'update user',
    type:UsersEntity
  })
  async updateUser(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto):Promise<UsersEntity> {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  @ApiTags('users')
  @ApiResponse({
    status: 200,
    description: 'delete user',
    type:[UsersEntity]
  })
  async removeUser(@Param('id') id: number):Promise<UsersEntity[]> {
    return await this.usersService.removeUser(id);
  }
}
