import { render } from "@testing-library/react";
import ProductCard from "@/components/ProductCard";
import "@testing-library/jest-dom";
import "@testing-library/react";
import { Product } from "@/types";

describe("product card", () => {
  test("displays a product card", () => {
    const mockProduct = {
      id: 1,
      title: "White t-shirt",
      category: "clothing",
      price: 10.99,
    };

    const { getByText } = render(
      <ProductCard product={mockProduct as Product} />
    );

    expect(getByText("White t-shirt")).toBeInTheDocument();
    expect(getByText("Category: clothing")).toBeInTheDocument();
    expect(getByText("$10.99")).toBeInTheDocument();
  });
});
