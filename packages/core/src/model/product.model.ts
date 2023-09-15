import { BaseModel } from './base.model';

export class ProductModel extends BaseModel {
  id!: string;
  name!: string;
  price!: number;

  constructor(id: string, name: string, price: number) {
    super();
    this.pk = `PRODUCT#${id}`;
    this.sk = id;
    this.gs1pk = 'PRODUCT';
    this.gs1sk = new Date().getTime().toString();
    this.id = id;
    this.name = name;
    this.price = price;

  }
}
