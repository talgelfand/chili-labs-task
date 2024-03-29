import { renderHook } from "@testing-library/react-hooks";
import { usePagination } from "@/hooks/usePagination";
import { Product } from "@/types";
import "@testing-library/react";

const mockProducts = [] as Product[];
for (let i = 1; i <= 20; i++) {
  mockProducts.push(i as unknown as Product);
}

describe("usePagination", () => {
  test.only("filters products correctly", () => {
    const { result } = renderHook(() => usePagination(1, mockProducts));

    expect(result.current.itemsToShow).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
    expect(result.current.numberOfPages).toEqual(3);
  });
});
