import { Product } from "@/types";
import { GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as ParsedUrlQuery;

  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  const product = await res.json();

  return { props: { product } };
};

export default function ProductPage({ product }: { product: Product }) {
  return (
    <div className="max-w-3xl mx-auto p-8">
      <div className="grid gap-4">
        <div className="flex items-end gap-2">
          <h1 className="text-3xl font-bold tracking-tight">{product.title}</h1>
        </div>
        <div className="grid gap-2">
          <p className="text-2xl font-bold">${product.price}</p>
          <p className="text-md">Category: {product.category}</p>
        </div>
        <div className="grid gap-4 text-base leading-loose">
          <p>{product.description}</p>
        </div>
      </div>
    </div>
  );
}
