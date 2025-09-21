import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { OrdersTable } from "@/components/orders/OrdersTable";
import { OrdersFilters } from "@/components/orders/OrdersFilters";
import { OrdersPagination } from "@/components/orders/OrdersPagination";
import { useOrdersData } from "@/hooks/useOrdersData";
import { animations } from "@/lib/animations";

const Orders: React.FC = () => {
  const {
    orders,
    statuses,
    filters,
    pagination,
    isLoading,
    error,
    handleFiltersChange,
    handlePageChange,
  } = useOrdersData({ itemsPerPage: 10 });

  const handleAddOrder = () => {
    // TODO: Implement add order functionality
    console.log('Add order clicked');
  };

  if (error) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold text-red-600">Error loading orders</h2>
        <p className="text-gray-600 mt-2">Please try refreshing the page.</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className={`mb-6 ${animations.entrance.slideDown}`}>
        <h1 className="text-2xl font-bold text-gray-900">Order List</h1>
        <p className="text-gray-600 mt-1">Manage and track all your orders</p>
      </div>

      <Card className={`bg-white shadow-sm ${animations.entrance.fadeIn} ${animations.interactive.card}`}>
        <CardHeader className="border-b border-gray-200 pb-4">
          <OrdersFilters
            filters={filters}
            onFiltersChange={handleFiltersChange}
            onAddOrder={handleAddOrder}
            statuses={statuses}
          />
        </CardHeader>
        
        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <LoadingSpinner size="lg" />
            </div>
          ) : (
            <>
              <OrdersTable 
                orders={orders} 
                isLoading={isLoading}
                filters={filters}
                onFiltersChange={handleFiltersChange}
              />
              
              {pagination.totalItems > 0 && (
                <OrdersPagination
                  pagination={pagination}
                  onPageChange={handlePageChange}
                />
              )}
              
              {pagination.totalItems === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500">No orders found matching your criteria.</p>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Orders;