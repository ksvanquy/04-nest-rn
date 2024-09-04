import { IsString, IsOptional } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsString()
  readonly parentId?: string;

  @IsOptional()
  @IsString()
  readonly description?: string;
}
