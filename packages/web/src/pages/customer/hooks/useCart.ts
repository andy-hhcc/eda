/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { useState } from 'react';

export const useCart = () => {
  const [items, setItems] = useState<any[]>([]);

  const addToCart = (item: any) => {
    setItems((currItems) => [...currItems, item])
  }

  const checkout = () => {
    axios.post('https://9qort37gm4.execute-api.ap-south-1.amazonaws.com/orders', {
      customerId: '12a4df21-a88e-4417-ba8c-4b150e5375f4',
      items
    })
  }

  return { addToCart, checkout }
}