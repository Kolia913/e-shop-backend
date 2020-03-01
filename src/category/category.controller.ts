import { Controller, Get, Res, HttpStatus, Param, NotFoundException, Post, Body, Put, Delete, Header, Head } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { CategoryModel } from "./category.model";
import { Response } from "express"
import { ValidateObjectId } from "src/common/pipe/validate-object-id.pipe";
import { CreateCategoryDto } from "./create-category.dto";

@Controller('categories')
export class CategoryController{
  constructor(private readonly categoryService: CategoryService){ }

  @Get('')
  @Header('Access-Control-Allow-Origin', '*')
  async getCategories(@Res() res: Response){
    const categories: CategoryModel[] = await this.categoryService.findAll()
    return res.status(HttpStatus.OK).json(categories)
   }

   @Get('/:categoryId')
   @Header('Access-Control-Allow-Origin','*')
   async getCategory(@Res() res: Response, @Param('categoryId', new ValidateObjectId()) categoryId: string){
       const category: CategoryModel = await this.categoryService.getCategory(categoryId)
       if(!category){
           throw new NotFoundException(`Category does not exist!`)
       }
       return res.status(HttpStatus.OK).json(category)
   }

   @Post('add')
   @Header('Access-Control-Allow-Origin','*')
   async addCategory(@Res() res: Response, @Body() createCategoryDto: CreateCategoryDto){
       const newCategory: CategoryModel = await this.categoryService.addCategory(createCategoryDto)
       return res.status(HttpStatus.OK).json({
           message: `Category has been successfully added!`,
           category: newCategory
       })
   }

   @Put('edit/:categoryId')
   @Header('Access-Control-Allow-Origin','*')
   async updateCategory(@Res() res: Response, 
     @Param('categoryId', new ValidateObjectId()) categoryId: string,
     @Body() createCategoryDto: CreateCategoryDto){
          const editedCategory: CategoryModel = await this.categoryService.editCategory(categoryId, createCategoryDto)
          if(!editedCategory){
              throw new NotFoundException(`Category does not exist!`)
          }
          return res.status(HttpStatus.OK).json({
              message: `Category has been successfully updated!`,
              category: editedCategory
          })
   }

   @Delete('delete/:categoryId')
   @Header('Access-Control-Allow-Origin','*')
   async deleteCategory(@Res() res: Response, @Param('categoryId', new ValidateObjectId()) ctaegoryId: string){
       const deletedCategory: CategoryModel = await this.categoryService.deleteCategory(ctaegoryId)
       if(!deletedCategory){
           throw new NotFoundException(`Category does not exist`)
       }
       return res.status(HttpStatus.OK).json({
           message: `Category has been deleted!`,
           category: deletedCategory
       })
   }
 }