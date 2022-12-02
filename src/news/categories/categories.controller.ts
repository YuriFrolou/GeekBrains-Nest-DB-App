import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateCommentDto } from '../comments/dto/update-comment.dto';
import { CommentsEntity } from '../comments/entities/comments.entity';
import { CategoriesEntity } from './entities/category.entity';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @ApiTags('categories')
  @ApiBody({ type: CreateCategoryDto })
  @ApiResponse({
    status: 201,
    description: 'create category',
    type:CategoriesEntity
  })
  async create(@Body() createCategoryDto: CreateCategoryDto):Promise<CategoriesEntity> {
    return await this.categoriesService.create({
      ...createCategoryDto
    });
  }

  @Get()
  @ApiTags('categories')
  @ApiResponse({
    status: 200,
    description: 'get all categories',
    type:[CategoriesEntity]
  })
  async findAll():Promise<CategoriesEntity[]> {
    return await this.categoriesService.findAll();
  }

  @Get(':id')
  @ApiTags('categories')
  @ApiResponse({
    status: 200,
    description: 'get category by id',
    type:CategoriesEntity
  })
  async findOne(@Param('id') id: number):Promise<CategoriesEntity> {
    return await this.categoriesService.findOne(id);
  }

  @Patch(':id')
  @ApiTags('categories')
  @ApiBody({ type: UpdateCategoryDto })
  @ApiResponse({
    status: 200,
    description: 'update category',
    type:CategoriesEntity
  })
  async update(@Param('id') id: number, @Body() updateCategoryDto: UpdateCategoryDto):Promise<CategoriesEntity> {
    return await this.categoriesService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  @ApiTags('categories')
  @ApiResponse({
    status: 200,
    description: 'remove category',
    type:[CategoriesEntity]
  })
  async remove(@Param('id') id: number):Promise<CategoriesEntity[]> {
    return await this.categoriesService.remove(id);
  }
}
