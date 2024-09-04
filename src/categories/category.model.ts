import { Model, model, Schema } from 'mongoose';
import { Category, CategorySchema } from './schemas/category.schema';

export const CategoryModel: Model<Category> = model<Category>('Category', CategorySchema);
