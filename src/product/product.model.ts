import { Document } from 'mongoose';

export interface ProductModel extends Document{
   readonly name: string;
   readonly description: string;
   readonly image: string;
   readonly price: number;
   readonly key: string;
   readonly categoryId: string;
}