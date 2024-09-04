import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from './schemas/category.schema';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(@InjectModel(Category.name) private categoryModel: Model<CategoryDocument>) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const newCategory = new this.categoryModel(createCategoryDto);
    return newCategory.save();
  }

  async findAll(): Promise<Category[]> {
    return this.categoryModel.find().exec();
  }

  async findByParentId(parentId: string): Promise<Category[]> {
    return this.categoryModel.find({ parentId }).exec();
  }

  async findAllChildren(parentId: string): Promise<CategoryDocument[]> {
    // Tìm tất cả các danh mục con trực tiếp
    const children = await this.categoryModel.find({ parentId }).exec();
  
    // Khởi tạo mảng để chứa tất cả các danh mục con bao gồm các danh mục con đệ quy
    let allChildren: CategoryDocument[] = [...children];
  
    // Lặp qua từng đứa con để tìm các con của nó đệ quy
    for (const child of children) {
      const subChildren = await this.findAllChildren(child._id.toString());
      allChildren = [...allChildren, ...subChildren];
    }
  
    return allChildren;
  }

  async findAllWithChildren(): Promise<CategoryDocument[]> {
    const categories = await this.categoryModel.find({}).exec();
    // console.log('Categories:', categories); // Kiểm tra dữ liệu lấy được từ CSDL
  
    const map = new Map<string, CategoryDocument>();
    categories.forEach(category => map.set(category._id.toString(), category));
  
    // const result: CategoryDocument[] = [];
  
    categories.forEach(category => {
      if (category.parentId) {
        const parent = map.get(category.parentId.toString());
        if (parent) {
          parent.children = parent.children || [];
          parent.children.push(category);
        }
      } else {
        result.push(category);
      }
    });
  
    // Kiểm tra kết quả phân cấp
    console.log('Result:', result);
  
    return result;
  }

  // Để xây dựng cấu trúc phân cấp, bạn cần thêm phương thức này nếu cần:
  async getHierarchy(parentId: string | null): Promise<CategoryDocument[]> {
    // Tìm tất cả các danh mục con của parentId
    const categories = await this.categoryModel.find({ parentId }).exec();
    
    // Xây dựng cấu trúc phân cấp
    for (const category of categories) {
      category.children = await this.getHierarchy(category._id.toString());
    }
  
    return categories;
  }

  async findOne(id: string): Promise<Category> {
    const category = await this.categoryModel.findById(id).exec();
    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }
    return category;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    const updatedCategory = await this.categoryModel.findByIdAndUpdate(id, updateCategoryDto, {
      new: true,
    }).exec();
    if (!updatedCategory) {
      throw new NotFoundException(`Category #${id} not found`);
    }
    return updatedCategory;
  }

  async remove(id: string): Promise<void> {
    const result = await this.categoryModel.findByIdAndDelete(id).exec();
    if (result === null) {
      throw new NotFoundException(`Category #${id} not found`);
    }
  }
}
