import Pagination from "@/components/Pagination";
import ProductCard from "@/components/ProductCard";
import { PaginationContext } from "@/context";
import { useFilterProducts } from "@/hooks/useFilterProducts";
import { usePagination } from "@/hooks/usePagination";
import { Product } from "@/types";
import Error from "next/error";
import { useContext } from "react";

export const getServerSideProps = async () => {
  try {
    const res = await fetch(process.env.PRODUCTS_API_URL!);
    const products = await res.json();
    return {
      props: { allProducts: products },
    };
  } catch (error: any) {
    return {
      props: {
        error: {
          message: error.message,
          statusCode: 500,
        },
        allProducts: [],
      },
    };
  }
};

export default function Home({
  error,
  allProducts,
}: {
  error?: { message: string; statusCode: number };
  allProducts: Product[];
}) {
  const { filteredProducts, searchProducts } = useFilterProducts(allProducts);
  const { currentPage, setCurrentPage } = useContext(PaginationContext);
  const { itemsToShow } = usePagination(currentPage, filteredProducts);

  if (error?.message) {
    return <Error statusCode={error.statusCode} title={error.message} />;
  }

  return (
    <main className="p-4 md:p-12">
      <input
        className="border rounded-md py-2 px-3 w-full mb-5"
        placeholder="Enter a product..."
        onChange={(event) => {
          searchProducts(event.target.value);
          setCurrentPage(1);
        }}
      />
      {!itemsToShow?.length ? (
        <h2>No products were found</h2>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {itemsToShow?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
      {allProducts.length > 8 && <Pagination products={filteredProducts} />}
    </main>
  );
}
