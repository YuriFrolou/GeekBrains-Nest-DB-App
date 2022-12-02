import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from '../../users/entities/users.entity';
import { Repository } from 'typeorm';
import { CategoriesEntity } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(@InjectRepository(CategoriesEntity) private readonly categoriesRepository: Repository<CategoriesEntity>) {
  }
  async create(createCategoryDto: CreateCategoryDto):Promise<CategoriesEntity> {
    const category = new CategoriesEntity();
    category.name= createCategoryDto.name;
    category.createdAt= new Date();
    category.updatedAt= new Date();

    return await this.categoriesRepository.save(category);
  }

  async findAll():Promise<CategoriesEntity[]> {
    return await this.categoriesRepository.find();
  }

  async findOne(id: number):Promise<CategoriesEntity> {
    const category = await this.categoriesRepository.findOneBy({ id });

    if (!category) {
      throw new NotFoundException();
    }
    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto):Promise<CategoriesEntity> {
    const category = await this.categoriesRepository.findOneBy({ id });

    if (!category) {
      throw new NotFoundException();
    }
    const updatedCategory = {
      ...category,
      name: updateCategoryDto.name ? updateCategoryDto.name : category.name,
      updatedAt: new Date()
    };
    await this.categoriesRepository.save(updatedCategory);
    return updatedCategory;
  }

  async remove(id: number):Promise<CategoriesEntity[]> {
    const category = await this.categoriesRepository.findOneBy({ id });
    if (!category) {
      throw new NotFoundException();
    }
    await this.categoriesRepository.remove(category);
    return await this.categoriesRepository.find();
  }
}
