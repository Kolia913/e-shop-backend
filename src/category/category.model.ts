import { Document } from 'mongoose';

export interface CategoryModel extends Document{
    readonly name: string;
    readonly description: string;
    readonly parentId: string;
}