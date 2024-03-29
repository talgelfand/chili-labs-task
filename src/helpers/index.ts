import { Product } from "@/types";

export function filterProducts(products: Product[], searchValue: string) {
  const searchValueLowercase = searchValue.toLowerCase();

  if (!searchValue) {
    return products;
  }

  const newProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(searchValueLowercase) ||
      product.category.toLowerCase().includes(searchValueLowercase)
  );
  return newProducts;
}
