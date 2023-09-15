import { BaseModel } from './base.model';

export class ConnectionModel extends BaseModel {

  constructor(connectionId: string) {
    super();
    this.pk = `CONNECTION`;
    this.sk = connectionId;
  }
}
