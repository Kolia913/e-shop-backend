import { Module } from '@nestjs/common';
import { ProductModule } from 'src/product/product.module';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {ProductSchema} from "../product/product.schema";

@Module({
 imports: [ProductModule, MongooseModule.forFeature([{name: 'Product', schema: ProductSchema}])],
 controllers: [CartController],
 providers: [CartService],})
export class CartModule {}
