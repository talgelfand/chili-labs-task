import { Product } from "@/types";
import Link from "next/link";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`products/${product.id}`}
      className="rounded-lg shadow-lg"
      data-testid="product-card"
    >
      <div className="p-4 bg-white">
        <h3 className="font-semibold text-lg leading-none">{product.title}</h3>
        <p className="text-sm text-gray-500">Category: {product.category}</p>
        <h4 className="font-semibold text-lg md:text-xl">${product.price}</h4>
      </div>
    </Link>
  );
}
