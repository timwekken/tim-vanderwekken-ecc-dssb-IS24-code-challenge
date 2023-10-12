import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@mui/material";
import { Product } from "../types/product";

export default function ProductTable({
  products,
  editProduct,
}: {
  products: Product[];
  editProduct: (product: Product) => void;
}) {
  return (
    <TableContainer component={Paper} style={{ maxWidth: '1400px' }}>
      <Table>
        <TableHead style={{ background: '#dbe9f7' }}>
          <TableRow>
            <TableCell>Product Number</TableCell>
            <TableCell>Product Name</TableCell>
            <TableCell>Scrum Master</TableCell>
            <TableCell>Product Owner</TableCell>
            <TableCell>Developer Names</TableCell>
            <TableCell>Start Date</TableCell>
            <TableCell>Methodology</TableCell>
            <TableCell>Location</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {products?.map((product) => {
            return (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.scrumMaster}</TableCell>
                <TableCell>{product.productOwner}</TableCell>
                <TableCell>{product.developers.join(', ')}</TableCell>
                <TableCell>{product.startDate}</TableCell>
                <TableCell>{product.methodology}</TableCell>
                <TableCell>
                  <a href={product.repoURL}>Github repo</a>
                </TableCell>
                {product.id && (
                  <TableCell>
                    <Button onClick={() => editProduct(product)}>Edit</Button>
                  </TableCell>
                )}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
