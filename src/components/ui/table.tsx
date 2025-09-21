import * as React from "react";
import {
  Table as MuiTable,
  TableBody as MuiTableBody,
  TableCell as MuiTableCell,
  TableContainer,
  TableHead as MuiTableHead,
  TableRow as MuiTableRow,
  Paper
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  boxShadow: 'none',
  border: `1px solid ${theme.palette.divider}`,
}));

const StyledTableCell = styled(MuiTableCell)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  padding: theme.spacing(2),
}));

const StyledTableHead = styled(MuiTableCell)(({ theme }) => ({
  backgroundColor: theme.palette.grey[50],
  fontWeight: 600,
  borderBottom: `1px solid ${theme.palette.divider}`,
  padding: theme.spacing(2),
  ...(theme.palette.mode === 'dark' && {
    backgroundColor: theme.palette.grey[900],
  }),
}));

const Table = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(
  ({ className, children, ...props }, ref) => (
    <TableContainer component={Paper} sx={{
      borderRadius: 1,
      boxShadow: 'none',
      border: 1,
      borderColor: 'divider'
    }} className={className}>
      <MuiTable ref={ref} {...props}>
        {children}
      </MuiTable>
    </TableContainer>
  )
);
Table.displayName = "Table";

const TableHeader = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, children, ...props }, ref) => (
    <MuiTableHead ref={ref} className={className} {...props}>
      {children}
    </MuiTableHead>
  )
);
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, children, ...props }, ref) => (
    <MuiTableBody ref={ref} className={className} {...props}>
      {children}
    </MuiTableBody>
  )
);
TableBody.displayName = "TableBody";

const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
  ({ className, children, ...props }, ref) => (
    <MuiTableRow ref={ref} className={className} hover {...props}>
      {children}
    </MuiTableRow>
  )
);
TableRow.displayName = "TableRow";

const TableHead = React.forwardRef<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement>>(
  ({ className, children, align, ...props }, ref) => (
    <StyledTableHead
      ref={ref}
      className={className}
      align={align === "char" ? "left" : align as "center" | "left" | "right" | "inherit" | "justify"}
      {...props}
    >
      {children}
    </StyledTableHead>
  )
);
TableHead.displayName = "TableHead";

const TableCell = React.forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(
  ({ className, children, align, ...props }, ref) => (
    <StyledTableCell
      ref={ref}
      className={className}
      align={align === "char" ? "left" : align as "center" | "left" | "right" | "inherit" | "justify"}
      {...props}
    >
      {children}
    </StyledTableCell>
  )
);
TableCell.displayName = "TableCell";

const TableFooter = MuiTableHead;
const TableCaption = ({ children, ...props }: React.HTMLAttributes<HTMLTableCaptionElement>) => (
  <caption {...props}>{children}</caption>
);

export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption };