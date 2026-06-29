import Image from "next/image";
import Link from "next/link";
import { getProducts } from "@/db/product";

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <div
              key={product.id}
              className="group overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="relative h-[260px] w-full bg-gray-100">
                {product.images.length > 0 ? (
                  <Image
                    src={product.images[0].url}
                    alt={product.name}
                    fill
                    className="object-cover transition duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-gray-500">
                    No Image
                  </div>
                )}
              </div>

              <div className="p-5">
                <h2 className="line-clamp-1 text-lg font-semibold text-gray-900">
                  {product.name}
                </h2>

                <p className="mt-2 text-xl font-bold text-gray-900">
                  ₹{product.price.toString()}
                </p>

                <p className="mt-3 line-clamp-2 text-sm leading-6 text-gray-600">
                  {product.description}
                </p>

                <Link
                  href={`/products/${product.slug}`}
                  className="mt-5 inline-flex w-full items-center justify-center rounded-md bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-700"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
