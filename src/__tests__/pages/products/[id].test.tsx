import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import "@testing-library/react";
import ProductPage from "@/pages/products/[id]";
import { Product } from "@/types";

describe("product page", () => {
  test("displays a product page", () => {
    const mockProduct = {
      id: 1,
      title: "White t-shirt",
      description: "Simple white t-shirt for everyone",
      category: "clothing",
      price: 10.99,
    };

    const { getByText } = render(
      <ProductPage product={mockProduct as Product} />
    );

    expect(getByText("White t-shirt")).toBeInTheDocument();
    expect(getByText("Category: clothing")).toBeInTheDocument();
    expect(getByText("Simple white t-shirt for everyone")).toBeInTheDocument();
    expect(getByText("$10.99")).toBeInTheDocument();
  });
});
