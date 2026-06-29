import { NextRequest, NextResponse } from "next/server";
import { getProductBySlug } from "@/db/product";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;

  const product = await getProductBySlug(slug);

  if (!product) {
    return NextResponse.json(
      {
        success: false,
        message: "Product not found",
      },
      {
        status: 404,
      },
    );
  }

  return NextResponse.json({
    success: true,
    data: product,
  });
}
