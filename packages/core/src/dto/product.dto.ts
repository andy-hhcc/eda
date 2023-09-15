import { Exclude } from 'class-transformer';
import { ProductBaseDto } from './product_base.dto';

@Exclude()
export class ProductDto extends ProductBaseDto {}
