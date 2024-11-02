export interface productCardProps {
  _id: string;
  title: string;
  image: string;
  price: number;
  stock: number;
  quantity: number;
}
export interface CartItemProps extends productCardProps {
  item: string;
}


