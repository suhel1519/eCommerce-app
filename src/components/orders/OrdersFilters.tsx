import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Plus, Filter, ArrowUpDown } from "lucide-react";
import { OrderFilters } from "@/types/orders";
import { animations } from "@/lib/animations";

interface OrdersFiltersProps {
  filters: OrderFilters;
  onFiltersChange: (filters: Partial<OrderFilters>) => void;
  onAddOrder?: () => void;
  statuses: string[];
}

export const OrdersFilters: React.FC<OrdersFiltersProps> = React.memo(({ 
  filters, 
  onFiltersChange, 
  onAddOrder,
  statuses 
}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <Button 
          size="sm" 
          className={`bg-blue-600 hover:bg-blue-700 ${animations.interactive.button}`}
          onClick={onAddOrder}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add
        </Button>
        
        <Select 
          value={filters.status || 'all'} 
          onValueChange={(value) => onFiltersChange({ status: value })}
        >
          <SelectTrigger className="w-32">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            {statuses.map((status) => (
              <SelectItem key={status} value={status}>
                {status === 'all' ? 'All Status' : status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select 
          value={`${filters.sortBy || 'date'}-${filters.sortOrder || 'desc'}`}
          onValueChange={(value) => {
            const [sortBy, sortOrder] = value.split('-') as [string, 'asc' | 'desc'];
            onFiltersChange({ sortBy: sortBy as any, sortOrder });
          }}
        >
          <SelectTrigger className="w-40">
            <ArrowUpDown className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Sort" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date-desc">Date (Newest)</SelectItem>
            <SelectItem value="date-asc">Date (Oldest)</SelectItem>
            <SelectItem value="name-asc">Name (A-Z)</SelectItem>
            <SelectItem value="name-desc">Name (Z-A)</SelectItem>
            <SelectItem value="status-asc">Status (A-Z)</SelectItem>
            <SelectItem value="status-desc">Status (Z-A)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="relative w-80">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search orders, users, projects..."
          value={filters.search}
          onChange={(e) => onFiltersChange({ search: e.target.value })}
          className="pl-10 border-gray-300"
        />
      </div>
    </div>
  );
});

OrdersFilters.displayName = "OrdersFilters";
