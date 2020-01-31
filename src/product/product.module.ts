import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './product.schema';
import { ProductService } from './product.service';
import { CategoryModule } from 'src/category/category.module';

@Module({
    imports: [MongooseModule.forFeature([{name: 'Product',schema: ProductSchema}]), CategoryModule],
    controllers: [ProductController],
    providers: [ProductService],
})
export class ProductModule {}
