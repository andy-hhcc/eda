import { Expose } from 'class-transformer';

export class ProductBaseDto {
  @Expose()
  id!: string;
  
  @Expose()
  name!: string;

  @Expose()
  price!: number;
}
