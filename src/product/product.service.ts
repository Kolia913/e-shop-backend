import { Injectable, Post } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ProductModel } from "./product.model";
import { Model } from "mongoose";
import { CreateProductDto } from "./create-product.dto"

  @Injectable()
  export class ProductService{
     constructor(@InjectModel('Product') private readonly productModel: Model<ProductModel>){ }
     
     async addProduct(createProductDto: CreateProductDto): Promise<ProductModel>{
        const createdProduct: ProductModel = new this.productModel(createProductDto)
        return await createdProduct.save()
     }

     async findAll(): Promise<ProductModel[]>{
        return await this.productModel.find().exec()
     }

     async getProduct(productId: string): Promise<ProductModel>{
        return await this.productModel.findById(productId).exec()
     }

     async editProduct(productId: string, createProductDto: CreateProductDto): Promise<ProductModel>{
        const editedProduct: ProductModel = await this.productModel.findByIdAndUpdate(productId, createProductDto)
        return editedProduct
     }

     async deleteProduct(productId: string): Promise<ProductModel>{
        const deletedProduct = await this.productModel.findByIdAndRemove(productId)
        return deletedProduct
     }

     async findByCategory(categoryId: string){
        const query = {categoryId: categoryId}
        const products: ProductModel[] = await this.productModel.find(query)
        return products
     }
  } 