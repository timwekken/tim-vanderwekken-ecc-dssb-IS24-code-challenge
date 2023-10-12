import { type NextRequest } from 'next/server'
import { getProducts, getFilteredProducts } from "@/app/services/productService";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const firstFilter = searchParams?.entries()?.next();
  let products;
  if (firstFilter.value) {
    const [key, value] = firstFilter.value;
    products = getFilteredProducts(key, value);
  } else {
    products = getProducts();
  }
  return Response.json({ products });
}


