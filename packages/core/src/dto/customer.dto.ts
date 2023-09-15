import { Exclude, Expose } from 'class-transformer';
import { CustomerBaseDto } from './customer_base.dto';

@Exclude()
export class CustomerDto extends CustomerBaseDto {

}
