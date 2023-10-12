/**
 * @swagger
 * /api/health:
 *   get:
 *     summary: Check the health of the API
 *     responses:
 *       200:
 *         description: API is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: 'API is healthy'
 */
export async function GET() { 
  return Response.json({ status: 'API is healthy' })
}