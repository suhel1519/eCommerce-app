import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { Order, OrderFilters } from "@/types/orders";
import { animations } from "@/lib/animations";

interface OrdersTableProps {
  orders: Order[];
  isLoading?: boolean;
  filters?: OrderFilters;
  onFiltersChange?: (filters: Partial<OrderFilters>) => void;
}

const getStatusBadge = (status: string) => {
  const statusConfig = {
    Complete: "bg-green-100 text-green-800 border-green-200",
    "In Progress": "bg-blue-100 text-blue-800 border-blue-200",
    Pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    Approved: "bg-purple-100 text-purple-800 border-purple-200",
    Rejected: "bg-red-100 text-red-800 border-red-200",
  };

  const className = statusConfig[status as keyof typeof statusConfig] || "bg-gray-100 text-gray-700 border-gray-200";

  return (
    <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${className}`}>
      {status}
    </div>
  );
};

export const OrdersTable: React.FC<OrdersTableProps> = React.memo(({ orders, isLoading, filters, onFiltersChange }) => {
  const handleSort = (sortBy: OrderFilters['sortBy']) => {
    if (!onFiltersChange || !filters) return;
    
    const newSortOrder = filters.sortBy === sortBy && filters.sortOrder === 'asc' ? 'desc' : 'asc';
    onFiltersChange({ sortBy, sortOrder: newSortOrder });
  };

  const getSortIcon = (column: OrderFilters['sortBy']) => {
    if (!filters || filters.sortBy !== column) {
      return <ArrowUpDown className="h-4 w-4 text-gray-400" />;
    }
    return filters.sortOrder === 'asc' 
      ? <ArrowUp className="h-4 w-4 text-gray-600" />
      : <ArrowDown className="h-4 w-4 text-gray-600" />;
  };
  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="animate-pulse flex space-x-4 p-4">
            <div className="rounded-full bg-gray-300 h-8 w-8"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="border-b border-gray-200">
          <TableHead className="w-12 text-center">
            <input type="checkbox" className="rounded" aria-label="Select all orders" />
          </TableHead>
          <TableHead className="text-gray-600 font-medium">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-auto p-0 font-medium text-gray-600 hover:text-gray-900"
              onClick={() => handleSort('name')}
            >
              Order ID
              {getSortIcon('name')}
            </Button>
          </TableHead>
          <TableHead className="text-gray-600 font-medium">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-auto p-0 font-medium text-gray-600 hover:text-gray-900"
              onClick={() => handleSort('name')}
            >
              User
              {getSortIcon('name')}
            </Button>
          </TableHead>
          <TableHead className="text-gray-600 font-medium">Project</TableHead>
          <TableHead className="text-gray-600 font-medium">Address</TableHead>
          <TableHead className="text-gray-600 font-medium">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-auto p-0 font-medium text-gray-600 hover:text-gray-900"
              onClick={() => handleSort('date')}
            >
              Date
              {getSortIcon('date')}
            </Button>
          </TableHead>
          <TableHead className="text-gray-600 font-medium">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-auto p-0 font-medium text-gray-600 hover:text-gray-900"
              onClick={() => handleSort('status')}
            >
              Status
              {getSortIcon('status')}
            </Button>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order, index) => (
          <TableRow 
            key={order.id} 
            className={`border-b border-gray-100 hover:bg-gray-50 ${animations.interactive.row} ${animations.transition.smooth}`}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <TableCell className="text-center">
              <input type="checkbox" className="rounded" aria-label={`Select order ${order.id}`} />
            </TableCell>
            <TableCell className="font-medium text-gray-900">{order.id}</TableCell>
            <TableCell>
              <div className="flex items-center space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className={`${order.user.color} ${order.user.color.includes('red') || order.user.color.includes('blue') || order.user.color.includes('green') || order.user.color.includes('purple') ? 'text-white' : 'text-gray-700'} text-xs font-medium`}>
                    {order.user.avatar}
                  </AvatarFallback>
                </Avatar>
                <span className="font-medium text-gray-900">{order.user.name}</span>
              </div>
            </TableCell>
            <TableCell className="text-gray-600">{order.project}</TableCell>
            <TableCell className="text-gray-600">{order.address}</TableCell>
            <TableCell className="text-gray-600">{order.date}</TableCell>
            <TableCell>{getStatusBadge(order.status)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
});

OrdersTable.displayName = "OrdersTable";
