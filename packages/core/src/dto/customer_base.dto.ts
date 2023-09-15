import { Expose } from 'class-transformer';

export class CustomerBaseDto {
  @Expose()
  id!: string;
  
  @Expose()
  name!: string;
}
