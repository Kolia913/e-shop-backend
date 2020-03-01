import { Controller, Res, Body, Post, HttpStatus, Header, Get } from "@nestjs/common";
import { CartService } from "./cart.service";
import { Response } from "express";

@Controller('cart')
export class CartController{
    constructor(private readonly cartService: CartService) { }
    
    @Post('buy')
    @Header('Access-Control-Allow-Origin', '*')
    //@Header('Access-Control-Request-Method', 'POST')
    async buyCart(@Res() res: Response, @Body() productsId: string[]){
      const keys: string[] = await this.cartService.buyCart(productsId)
      return res.status(HttpStatus.OK).json(keys)
    }
}