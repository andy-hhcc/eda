import { randomShardId } from '../utils';
import { BaseModel } from './base.model';

export class OrderModel extends BaseModel {
  id!: string;
  status!: string;
  totalPrice!: number;
  createdDate!: number;

  constructor({ id, totalPrice, customerId, status = 'NEW' }: any) {
    super();

    const createdDate = new Date().getTime();
    
    this.pk = `ORDER#${id}`;
    this.sk = `ORDER#${id}`;
    this.gs1pk = `ORDER#${randomShardId()}`;
    this.gs1sk = `${status}#${createdDate.toString()}`;
    this.gs2pk = `CUSTOMER#${customerId}`;
    this.gs2sk = `ORDER#${status}#${createdDate.toString()}`;
    this.id = id;
    this.status = status;
    this.totalPrice = totalPrice;
    this.createdDate = createdDate;
  }
}
