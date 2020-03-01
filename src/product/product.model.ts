import { Document } from 'mongoose';
import { Platform } from './product-platform.enum';

export interface ProductModel extends Document{
   readonly name: string;
   readonly description: string;
   readonly image: string;
   readonly price: number;
   readonly key: string;
   readonly categoryId: string;
   readonly platform: Platform[];
}