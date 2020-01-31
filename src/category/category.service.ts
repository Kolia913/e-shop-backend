import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { CategoryModel } from "./category.model";
import { Model } from "mongoose";
import { CreateCategoryDto } from "./create-category.dto";

@Injectable()
export class CategoryService{
    constructor(@InjectModel('Category') private readonly categoryModel: Model<CategoryModel>) { }

    async findAll(): Promise<CategoryModel[]>{
       return await this.categoryModel.find().exec()
    }

    async getCategory(categoryId: string): Promise<CategoryModel>{
        return await this.categoryModel.findById(categoryId)
    }
    
    async addCategory(createCategoryDto: CreateCategoryDto): Promise<CategoryModel>{
        const newCategory: CategoryModel = new this.categoryModel(createCategoryDto)
        return await newCategory.save()
    }

    async editCategory(categoryId: string, createCategoryDto: CreateCategoryDto): Promise<CategoryModel>{
        const editedCategory: CategoryModel = await this.categoryModel.findByIdAndUpdate(categoryId, createCategoryDto)
        return editedCategory
    }

    async deleteCategory(categoryId: string): Promise<CategoryModel>{
        const deletedCategory: CategoryModel = await this.categoryModel.findByIdAndRemove(categoryId)
        return deletedCategory
    }
}
