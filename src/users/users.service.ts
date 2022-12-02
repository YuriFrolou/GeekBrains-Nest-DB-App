import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {


  constructor(@InjectRepository(UsersEntity) private readonly usersRepository: Repository<UsersEntity>) {
  }

  async createUser(createUserDto: CreateUserDto):Promise<UsersEntity> {
    const user = new UsersEntity();
    user.firstName= createUserDto.firstName;
    user.lastName= createUserDto.lastName;
    user.email= createUserDto.email;
    user.role= createUserDto.role;
    user.createdAt= new Date();
    user.updatedAt= new Date();

    return await this.usersRepository.save(user);
  }

  async getUsers():Promise<UsersEntity[]> {
    return await this.usersRepository.find();
  }

  async getUserById(id: number):Promise<UsersEntity> {
    const user = await this.usersRepository.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }


  async updateUser(id: number, updateUserDto: UpdateUserDto):Promise<UsersEntity> {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException();
    }
    const updatedUser = {
      ...user,
      firstName: updateUserDto.firstName ? updateUserDto.firstName : user.firstName,
      lastName: updateUserDto.lastName ? updateUserDto.lastName : user.lastName,
      email: updateUserDto.email ? updateUserDto.email : user.email,
      updatedAt: new Date()
    };
    await this.usersRepository.save(updatedUser);
    return updatedUser;
  }


  async removeUser(id: number):Promise<UsersEntity[]> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException();
    }
    await this.usersRepository.remove(user);
    return await this.usersRepository.find();
  }

}
