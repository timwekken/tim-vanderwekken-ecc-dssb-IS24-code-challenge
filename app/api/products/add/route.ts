import { addOrEditProduct } from '@/app/services/productService';

export async function POST(req: Request) {
  const newProduct = await req.json();
  const updatedProduct = addOrEditProduct(newProduct);
  return Response.json({ updatedProduct });
}
