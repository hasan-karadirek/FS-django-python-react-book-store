export interface BookImage {
  book: number;
  image: string;
}
export interface Tag {
  tag: {
    id: number;
    name: string;
  };
}
export interface Book {
  id: number;
  isbn: string;
  env_no: number;
  title: string;
  author: string;
  publishing_house: string;
  language: string;
  cover: string;
  year: number;
  edition: string;
  category: string;
  condition_description: string;
  condition: string;
  price: string;
  status: string;
  tags: Tag[];
  images: BookImage[];
}

export interface Customer {
  email: string;
  first_name: string;
  last_name: string;
  username: string;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  image: string;
}

export interface OrderDetail {
  id: number;
  order: number;
  book: Book;
}
export interface Order {
  id: number;
  customer: number;
  cost: string;
  address: string;
  status: string;
  order_details: OrderDetail[];
}
