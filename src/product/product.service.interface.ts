export type ProductCategory = 'alat' | 'bahan';

export interface Product {
  id: number;
  name: string;
  category: ProductCategory;
}
