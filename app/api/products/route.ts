import { NextRequest, NextResponse } from "next/server";
import { createProduct, getProducts } from "@/db/product";

export async function GET(request: NextRequest) {
  const search = request.nextUrl.searchParams.get("search") ?? "";
  const category = request.nextUrl.searchParams.get("category") ?? "";

  const products = await getProducts(search, category);

  return NextResponse.json({
    success: true,
    data: products,
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const product = await createProduct(body);

    return NextResponse.json(
      {
        success: true,
        message: "Product created successfully",
        data: product,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create product",
      },
      {
        status: 500,
      },
    );
  }
}
