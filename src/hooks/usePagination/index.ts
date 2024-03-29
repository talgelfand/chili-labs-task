import { Product } from "@/types";

export const usePagination = (currentPage: number, products: Product[]) => {
  const productsPerPage = 8;
  const numberOfPages = Math.ceil(products.length / productsPerPage);

  const itemsToShow = products.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  return { numberOfPages, itemsToShow };
};
