import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './schemas/category.schema';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}


  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  async findAll(): Promise<Category[]> {
    return this.categoriesService.findAll();
  }

  @Get('children')
  async findByParentId(@Query('parentId') parentId: string): Promise<Category[]> {
    return this.categoriesService.findByParentId(parentId);
  }

  @Get('all-children')
  async findAllChildren(@Query('parentId') parentId: string): Promise<Category[]> {
    return this.categoriesService.findAllChildren(parentId);
  }

  // @Get('hierarchy')
  // async getHierarchy(@Query('parentId') parentId: string): Promise<CategoryDocument[]> {
  //   return this.categoriesService.getHierarchy(parentId || null);
  // }


  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Category> {
    return this.categoriesService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.categoriesService.remove(id);
  }
}
