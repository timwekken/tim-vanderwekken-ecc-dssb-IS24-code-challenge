import { type NextRequest } from 'next/server'
import { getProducts, getFilteredProducts } from "@/app/services/productService";

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get products with optional filtering.
 *     tags:
 *       - Products
 *     parameters:
 *       - name: key
 *         in: query
 *         description: Key for filtering products.
 *         required: false
 *         type: string
 *       - name: value
 *         in: query
 *         description: Value for filtering products.
 *         required: false
 *         type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         schema:
 *           type: object
 *           properties:
 *             products:
 *               type: array
 *               items:
 *                 type: string
 *       500:
 *         description: Internal server error
 */
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const firstFilter = searchParams.entries().next();

    let products;

    if (firstFilter.value) {
      const [key, value] = firstFilter.value;
      products = getFilteredProducts(key, value);
    } else {
      products = getProducts();
    }

    return Response.json({ products });
  } catch (error) {
    console.error('Error:', error);
    return Response.error();
  }
}


