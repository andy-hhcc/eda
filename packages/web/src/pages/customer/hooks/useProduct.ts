import axios from 'axios';
import { useEffect, useState } from 'react';

/* eslint-disable @typescript-eslint/no-explicit-any */
export const useProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const results = await axios.get(
      'https://9qort37gm4.execute-api.ap-south-1.amazonaws.com/products'
    );
    setProducts(results.data.data);
  };
  
  return { products };
};
