export class OrderCreationRequest {
  customerId!: string;
  items!: OrderItemRequest[];
}

export class OrderItemRequest {
  productId!: string;
  productName!: string;
  price!: number;
  quantity!: number;
}
