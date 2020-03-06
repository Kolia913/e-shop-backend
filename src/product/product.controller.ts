import { Controller, Get, Res, HttpStatus, Param, NotFoundException, Post, Body, Put, Query, Delete, Header } from "@nestjs/common";
import { ProductService } from "./product.service";
import { ProductModel } from "./product.model";
import { ValidateObjectId } from "src/common/pipe/validate-object-id.pipe";
import { Response, Request } from 'express';
import { CreateProductDto } from "./create-product.dto";

@Controller('products')
export class ProductController{
    constructor(private readonly productService: ProductService){ }

    @Get('')
    @Header('Access-Control-Allow-Origin', '*')
    async getProducts(@Res() res: Response){
        const products: ProductModel[] = await this.productService.findAll()
        return res.status(HttpStatus.OK).json(products)
    }

    @Get('/:productId')
    @Header('Access-Control-Allow-Origin', '*')
    async getProduct(@Res() res: Response, @Param('productId',new ValidateObjectId()) productId: string){
      const product: ProductModel = await this.productService.getProduct(productId)
      if(!product){
          throw new NotFoundException('Product does not exist')
      }
      return res.status(HttpStatus.OK).json(product)
    }

    @Get('/category/:categoryId')
    @Header('Access-Control-Allow-Origin', '*')
    async getProductsByCategory(@Res() res: Response, @Param('categoryId', new ValidateObjectId()) categoryId: string){
        const products: ProductModel[] = await this.productService.findByCategory(categoryId)
        if(!products){
            res.json(HttpStatus.NOT_FOUND).send(`No results!`)
        }
        return res.status(HttpStatus.OK).json(products)
    }

    @Post('add')
    @Header('Access-Control-Allow-Origin', '*')
    async addProudct(@Res() res: Response, @Body() createProductDto: CreateProductDto){
        const newProduct: ProductModel = await this.productService.addProduct(createProductDto)
        return res.status(HttpStatus.OK).json(newProduct)
    }

    @Put('edit/:productId')
    @Header('Access-Control-Allow-Origin', '*')
    async editProduct(@Res() res: Response, 
    @Param('productId', new ValidateObjectId()) productId: string, 
    @Body() createProductDto :CreateProductDto){
       const editedProduct: ProductModel = await this.productService.editProduct(productId, createProductDto)
       if(!editedProduct){
           throw new NotFoundException('Product does not exist!')
       }
       return res.status(HttpStatus.OK).json(editedProduct)
    }

    @Delete('delete/:productId')
    @Header('Access-Control-Allow-Origin', '*')
    async deleteProduct(@Res() res: Response, @Param('productId', new ValidateObjectId()) productId: string){
       const deletedProduct: ProductModel = await this.productService.deleteProduct(productId)
       if(!deletedProduct){
           throw new NotFoundException('Product does not exist!')
       }
       return res.status(HttpStatus.OK).json(deletedProduct)
    }
}