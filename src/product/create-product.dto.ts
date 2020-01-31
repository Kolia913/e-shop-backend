export class CreateProductDto{
  readonly name: string;
  readonly description: string;
  readonly image: string;
  readonly price: number;
  readonly key: string;
  readonly categoryId: string;
}