import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [
    // kết nối csdl mongo sử dụng IP v4
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/myNewDatabase'),
    // nạp categories module
    CategoriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
