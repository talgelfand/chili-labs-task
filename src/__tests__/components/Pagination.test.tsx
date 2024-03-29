import { render } from "@testing-library/react";
import Pagination from "@/components/Pagination";
import "@testing-library/jest-dom";
import "@testing-library/react";
import { Product } from "@/types";

describe("pagination", () => {
  test("displays pagination", () => {
    const mockProducts = [] as Product[];
    for (let i = 1; i <= 20; i++) {
      mockProducts.push(i as unknown as Product);
    }

    const { getByTestId, queryByTestId } = render(
      <Pagination products={mockProducts as Product[]} />
    );

    expect(getByTestId("pagination-number-1")).toBeInTheDocument();
    expect(getByTestId("pagination-number-2")).toBeInTheDocument();
    expect(getByTestId("pagination-number-3")).toBeInTheDocument();

    expect(queryByTestId("pagination-number-4")).toBeNull();
  });
});
