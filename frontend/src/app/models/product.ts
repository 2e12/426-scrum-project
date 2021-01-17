import Category from './category';
import User from './user';

export default class Product {
  id: number;
  name: string;
  value: string;
  description: string;
  seller: User;
  buyer: User;
  categories: Category[];
}
