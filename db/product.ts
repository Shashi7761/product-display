import { prisma } from "@/lib/db";

type ProductImageInput = {
  url: string;
};

type AttributeInput = {
  name: string;
  label: string;
  options: string[];
};

type ProductInput = {
  name: string;
  slug: string;
  description?: string;
  price: number;
  categorySlug?: string;
  images?: ProductImageInput[];
  attributes?: AttributeInput[];
};

const productInclude = {
  category: true,
  images: true,
  attributeDefinitions: {
    include: {
      options: true,
    },
  },
};

export async function getProducts(search?: string, category?: string) {
  const products = await prisma.product.findMany({
    where: {
      ...(search && {
        name: {
          contains: search,
          mode: "insensitive",
        },
      }),

      ...(category && {
        category: {
          slug: category,
        },
      }),
    },
    include: productInclude,
    orderBy: {
      createdAt: "desc",
    },
  });

  return products;
}

export async function getProductBySlug(slug: string) {
  const product = await prisma.product.findUnique({
    where: {
      slug,
    },
    include: productInclude,
  });

  return product;
}

export async function createProduct(data: ProductInput) {
  const product = await prisma.product.create({
    data: {
      name: data.name,
      slug: data.slug,
      description: data.description,
      price: data.price,

      ...(data.categorySlug && {
        category: {
          connectOrCreate: {
            where: {
              slug: data.categorySlug,
            },
            create: {
              name: data.categorySlug,
              slug: data.categorySlug,
            },
          },
        },
      }),

      images: {
        create:
          data.images
            ?.filter((image) => image.url.trim() !== "")
            .map((image) => ({
              url: image.url,
            })) ?? [],
      },

      attributeDefinitions: {
        create:
          data.attributes
            ?.filter(
              (attribute) =>
                attribute.name.trim() !== "" && attribute.label.trim() !== "",
            )
            .map((attribute) => ({
              name: attribute.name,
              label: attribute.label,
              options: {
                create: attribute.options
                  .filter((option) => option.trim() !== "")
                  .map((option) => ({
                    value: option,
                  })),
              },
            })) ?? [],
      },
    },
    include: productInclude,
  });

  return product;
}
