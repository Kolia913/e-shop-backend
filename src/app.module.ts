import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/eshop',
  {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true}),
   ProductModule, CategoryModule, CartModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
