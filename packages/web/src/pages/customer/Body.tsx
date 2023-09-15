import { useProducts } from './hooks/useProduct';

export const Body = () => {
  const { products } = useProducts();
  return <div className="body">
    body
  </div>;
};
