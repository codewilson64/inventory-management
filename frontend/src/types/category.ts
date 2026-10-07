export interface Category {
  category_id: number;
  name: string;
}

export interface CategoryWithProductCount extends Category {
  product_count: number;
}