import { Platform } from "./product-platform.enum";

export class CreateProductDto{
  readonly name: string;
  readonly description: string;
  readonly image: string;
  readonly price: number;
  readonly key: string;
  readonly categoryId: string;
  readonly platform: Platform[];
}