export const dynamic = "force-dynamic";
import Image from "next/image";
import Link from "next/link";
import { getProductBySlug } from "@/db/product";

type ProductDetailsPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProductDetailsPage({
  params,
}: ProductDetailsPageProps) {
  const { slug } = await params;

  const product = await getProductBySlug(slug);

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Product not found
          </h1>

          <Link
            href="/products"
            className="mt-4 inline-flex rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/products"
          className="mb-6 inline-flex text-sm font-medium text-gray-700 hover:text-gray-900"
        >
          Back to Products
        </Link>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="grid gap-4">
            {product.images.length > 0 ? (
              product.images.map((image) => (
                <div
                  key={image.id}
                  className="relative h-[420px] overflow-hidden rounded-lg border border-gray-200 bg-gray-100"
                >
                  <Image
                    src={image.url}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
              ))
            ) : (
              <div className="flex h-[420px] items-center justify-center rounded-lg border border-gray-200 bg-gray-100 text-sm text-gray-500">
                No Image
              </div>
            )}
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            {product.category && (
              <p className="mb-3 text-sm font-medium text-gray-500">
                {product.category.slug}
              </p>
            )}

            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

            <p className="mt-2 text-sm text-gray-500">{product.slug}</p>

            <p className="mt-6 text-2xl font-bold text-gray-900">
              ₹{product.price.toString()}
            </p>

            {product.description && (
              <p className="mt-5 text-sm leading-6 text-gray-600">
                {product.description}
              </p>
            )}

            <div className="mt-8">
              <h2 className="text-lg font-semibold text-gray-900">
                Attributes
              </h2>

              <div className="mt-4 space-y-5">
                {product.attributeDefinitions.length > 0 ? (
                  product.attributeDefinitions.map((attribute) => (
                    <div key={attribute.id}>
                      <h3 className="text-sm font-medium text-gray-900">
                        {attribute.label}
                      </h3>

                      <ul className="mt-2 flex flex-wrap gap-2">
                        {attribute.options.map((option) => (
                          <li
                            key={option.id}
                            className="rounded-md border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm text-gray-700"
                          >
                            {option.value}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">No attributes added.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
