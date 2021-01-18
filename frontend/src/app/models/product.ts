import Category from './category';

export default class Product {
  id: number;
  name: string;
  price: string;
  description: string;
  categories: Category[];
}
