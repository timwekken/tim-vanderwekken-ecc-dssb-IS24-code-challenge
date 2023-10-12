import { addOrEditProduct } from '@/app/services/productService';
import { NextApiResponse } from 'next';

/**
 * @swagger
 * /api/products/add:
 *   post:
 *     summary: Create a new product
 *     tags:
 *       - Products
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               name:
 *                 type: string
 *               productOwner:
 *                 type: string
 *               developers:
 *                 type: array
 *                 items:
 *                   type: string
 *               scrumMaster:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date
 *               methodology:
 *                 type: string
 *               repoURL:
 *                 type: string
 *     responses:
 *       200:
 *         description: Product created successfully
 *       500:
 *         description: Internal server error
 */
export async function POST(req: Request) {
  try {
    const newProduct = await req.json();
    const updatedProduct = addOrEditProduct(newProduct);
    return Response.json({ updatedProduct });
  } catch (error) {
    console.error('Error:', error);
    return Response.error();
  }
}
