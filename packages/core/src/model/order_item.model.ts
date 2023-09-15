import { BaseModel } from './base.model';

export class OrderItemModel extends BaseModel {
  productId!: string;
  productName!: string;
  quantity!: number;
  price!: number;

  constructor({ orderId, productId, productName, quantity, price }: any) {
    super();
    this.pk = `ORDER#${orderId}`;
    this.sk = `ORDER_ITEM#${productId}`;
    this.productId = productId;
    this.productName = productName;
    this.price = price;
    this.quantity = quantity;
  }
}
