import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ProductModel } from "src/product/product.model";

@Injectable()
export class CartService{
   constructor(@InjectModel('Product') private readonly productModel: Model<ProductModel>){}

   async buyCart(productsId: string[]): Promise<string[]>{
      const query = {_id : productsId}
      const products: ProductModel[] = await this.productModel.find(query)
     return products.map(product => `"${product.name}": ${product.key}`)
   }
}
