import "@testing-library/jest-dom";
import "@testing-library/react";
import { filterProducts } from "@/helpers";

describe("filterProducts helper", () => {
  test("filters products by search value", () => {
    const mockProducts = [
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

    expect(filterProducts(mockProducts, "men")).toEqual([
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
    ]);
    expect(filterProducts(mockProducts, "bags")).toEqual([
      {
        id: 1,
        title: "Mens backpack",
        category: "Men Bags",
        price: 10,
        description: "test",
      },
    ]);
    expect(filterProducts(mockProducts, "")).toEqual(mockProducts);
  });
});
