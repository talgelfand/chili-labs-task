import { PaginationContext } from "@/context";
import { usePagination } from "@/hooks/usePagination";
import { Product } from "@/types";
import { useContext } from "react";

export default function Pagination({ products }: { products: Product[] }) {
  const { currentPage, setCurrentPage } = useContext(PaginationContext);

  const { numberOfPages } = usePagination(currentPage, products);

  const handleClick = (index: number) => {
    setCurrentPage(index);
  };

  return (
    <div
      className="absolute bottom-10 right-10 border-gray-200 bg-white px-4 py-3 sm:px-6"
      data-testid="pagination"
    >
      <div>
        <nav
          className="isolate inline-flex -space-x-px rounded-md shadow-sm"
          aria-label="Pagination"
        >
          {Array.from({ length: numberOfPages }).map((_, index) => {
            const pageNumberStyles =
              currentPage === index + 1
                ? "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0";

            return (
              <button
                key={index}
                aria-current="page"
                className={`relative z-10 inline-flex items-center ${pageNumberStyles} px-4 py-2 text-sm font-semibold focus:z-20`}
                onClick={() => handleClick(index + 1)}
                data-testid={`pagination-number-${index + 1}`}
              >
                {index + 1}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
