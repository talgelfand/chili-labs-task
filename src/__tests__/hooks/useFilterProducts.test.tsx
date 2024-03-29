import { renderHook, act } from "@testing-library/react-hooks";
import { useFilterProducts } from "@/hooks/useFilterProducts";
import "@testing-library/jest-dom";
import "@testing-library/react";
import { filterProducts } from "@/helpers";

jest.mock("../../helpers", () => ({
  filterProducts: jest.fn(),
}));

const mockAllProducts = [
  {
    id: 1,
    title: "Mens backpack",
    category: "Men Bags",
    price: 10,
    description: "test",
  },
  {
    id: 2,
    title: "Women's dress",
    category: "Women clothing",
    price: 10,
    description: "test",
  },
  {
    id: 3,
    title: "Bucket hat",
    category: "Hats",
    price: 10,
    description: "test",
  },
];

describe("useFilterProducts", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("filters products correctly", () => {
    (filterProducts as jest.Mock).mockReturnValueOnce([mockAllProducts[0]]);

    const { result } = renderHook(() => useFilterProducts(mockAllProducts));

    act(() => {
      result.current.searchProducts("test");
    });

    expect(result.current.filteredProducts).toEqual([mockAllProducts[0]]);
  });
});
