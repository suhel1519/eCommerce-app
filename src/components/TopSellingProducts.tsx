import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const products = [
  { name: "Apple MacBook Pro M2", units: 129, price: 82, total: "$2,199.00" },
  { name: "Samsung Galaxy Tab S8", units: 118, price: 47, total: "$1,758.00" },
  { name: "Dell Ultrabook 13\"", units: 89, price: 63, total: "$1,234.00" },
  { name: "HP Pavilion Laptop", units: 109, price: 43, total: "$1,019.00" },
  { name: "Mouse Wireless", units: 234, price: 89, total: "$349.00" },
];

export function TopSellingProducts() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Top Selling Products</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-xs font-medium text-muted-foreground">Product Name</TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground text-right">Units</TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground text-right">Price</TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell className="text-right text-muted-foreground">{product.units}</TableCell>
                <TableCell className="text-right text-muted-foreground">{product.price}</TableCell>
                <TableCell className="text-right font-semibold text-warning">{product.total}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}