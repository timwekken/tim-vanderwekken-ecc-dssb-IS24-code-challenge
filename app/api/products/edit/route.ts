import { addOrEditProduct } from '@/app/services/productService';

export async function POST(req: Request) {
  const editedProduct = await req.json();
  const updatedProduct = addOrEditProduct(editedProduct);
  return Response.json({ updatedProduct });
}
