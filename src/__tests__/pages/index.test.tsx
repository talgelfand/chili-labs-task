import { fireEvent, render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import "@testing-library/react";

import { Product } from "@/types";
import PaginationContextProvider from "@/context";
import Home from "@/pages";

describe("homepage", () => {
  const mockProducts = [
    {
      id: 1,
      title: "Mens backpack",
      category: "Men Bags",
      price: 10,
    },
    {
      id: 2,
      title: "Women's dress",
      category: "Women clothing",
      price: 10,
    },
    {
      id: 3,
      title: "Bucket hat",
      category: "Hats",
      price: 10,
    },
  ];

  const { getAllByTestId, getByPlaceholderText } = render(
    <Home allProducts={mockProducts as Product[]} />
  );

  test("displays a homepage with an input and a list of products", () => {
    expect(getByPlaceholderText("Enter a product...")).toBeInTheDocument();
    expect(getAllByTestId("product-card")).toHaveLength(3);
  });

  test("changes the products in the list when typing into the search input", () => {
    const { getByTestId } = render(
      <Home allProducts={mockProducts as Product[]} />
    );

    const searchInput = getByPlaceholderText(
      "Enter a product..."
    ) as HTMLInputElement;

    fireEvent.change(searchInput, {
      target: { value: "Hat" },
    });

    expect(searchInput.value).toBe("Hat");
    expect(getAllByTestId("product-card")).toHaveLength(1);
    expect(getByTestId("product-card")).toHaveTextContent("Bucket hat");
    expect(getByTestId("product-card")).toHaveTextContent("Hats");
    expect(getByTestId("product-card")).toHaveTextContent("$10");
  });

  test("displays an error if api call fails", () => {
    const { getByText } = render(
      <Home
        allProducts={mockProducts as Product[]}
        error={{ message: "An error occurred", statusCode: 500 }}
      />
    );

    expect(getByText("500")).toBeInTheDocument();
    expect(getByText("An error occurred.")).toBeInTheDocument();
  });

  test("doesn't display pagination if there are less than 8 products", () => {
    const { queryByTestId } = render(
      <Home allProducts={mockProducts as Product[]} />
    );

    expect(queryByTestId("pagination")).toBeNull();
  });

  test("displays pagination if there are more than 8 products", () => {
    const mockProducts = [] as Product[];
    for (let i = 1; i <= 20; i++) {
      mockProducts.push(i as unknown as Product);
    }

    const { getByTestId } = render(
      <Home allProducts={mockProducts as Product[]} />
    );

    expect(getByTestId("pagination")).toBeInTheDocument();
  });

  test("click on the specific page will change displayed values", async () => {
    const mockProducts = [] as Product[];
    for (let i = 1; i <= 20; i++) {
      mockProducts.push({
        id: i,
        title: i.toString(),
        category: i.toString(),
      } as Product);
    }

    const { getByTestId, getByText, queryByText } = render(
      <PaginationContextProvider>
        <Home allProducts={mockProducts as Product[]} />
      </PaginationContextProvider>
    );

    const secondPageButton = getByTestId("pagination-number-2");

    secondPageButton.click();

    await waitFor(() => {
      expect(queryByText("Category: 1")).toBeNull();
      expect(queryByText("Category: 2")).toBeNull();

      expect(getByText("Category: 9")).toBeInTheDocument();
      expect(getByText("Category: 10")).toBeInTheDocument();
      expect(getByText("Category: 11")).toBeInTheDocument();
    });
  });
});
