import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Types } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema()
export class Category {
  @Prop({ required: true })
  name: string;

  @Prop({ type: Types.ObjectId, ref: 'Category', default: null })
  parentId: Types.ObjectId | null;

  @Prop()
  description: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
