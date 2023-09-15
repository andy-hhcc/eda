import { BaseModel } from './base.model';

export class CustomerModel extends BaseModel {
  id!: string;
  name!: string;

  constructor(id: string, name: string) {
    super();
    this.id = id;
    this.name = name;
    this.pk = `CUSTOMER#${id}`;
    this.sk = `PROFILE#${id}`;
    this.gs1pk = 'CUSTOMER';
    this.gs1sk = new Date().getTime().toString();
  }
}
