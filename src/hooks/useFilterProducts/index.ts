import { filterProducts } from "@/helpers";
import { Product } from "@/types";
import { useState } from "react";

export const useFilterProducts = (allProducts: Product[]) => {
  const [filteredProducts, setFilteredProducts] =
    useState<Product[]>(allProducts);

  function searchProducts(searchValue: string) {
    const newProducts = filterProducts(allProducts, searchValue);
    setFilteredProducts(newProducts);
  }

  return { filteredProducts, searchProducts };
};
