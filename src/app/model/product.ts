export interface IProduct {
  image: ImageType;
  name: string;
  category: string;
  price: number;
}

export interface ImageType {
  [index: string]: string;
}

export interface IProductList {
  products: IProduct[];
}

export interface CartItem {
  name: string;
  price: number;
  quantity: number;
  thumbnail: string;
}

export interface ProductsState {
  products: IProduct[];
  error: string | null;
  cart: CartItem[];
}
