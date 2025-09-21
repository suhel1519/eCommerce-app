import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getOrders, getOrderStatuses } from '@/services/ordersService';
import { OrderFilters, PaginationInfo } from '@/types/orders';

interface UseOrdersDataProps {
  initialFilters?: Partial<OrderFilters>;
  itemsPerPage?: number;
}

export const useOrdersData = ({ 
  initialFilters = {}, 
  itemsPerPage = 10 
}: UseOrdersDataProps = {}) => {
  const [filters, setFilters] = useState<OrderFilters>({
    search: "",
    status: "all",
    sortBy: "date",
    sortOrder: "desc",
    ...initialFilters,
  });
  
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch orders with current filters
  const { 
    data: allOrders = [], 
    isLoading, 
    error,
    refetch 
  } = useQuery({
    queryKey: ['orders', filters],
    queryFn: () => getOrders(filters),
  });

  // Get available statuses
  const statuses = useMemo(() => getOrderStatuses(), []);

  // Calculate pagination
  const pagination: PaginationInfo = useMemo(() => {
    const totalItems = allOrders.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    return {
      currentPage,
      itemsPerPage,
      totalItems,
      totalPages,
    };
  }, [allOrders.length, currentPage, itemsPerPage]);

  // Get current page orders
  const paginatedOrders = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return allOrders.slice(startIndex, startIndex + itemsPerPage);
  }, [allOrders, currentPage, itemsPerPage]);

  // Handlers
  const handleFiltersChange = (newFilters: Partial<OrderFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const resetFilters = () => {
    setFilters({
      search: "",
      status: "all",
      sortBy: "date",
      sortOrder: "desc",
    });
    setCurrentPage(1);
  };

  return {
    // Data
    orders: paginatedOrders,
    allOrders,
    statuses,
    
    // State
    filters,
    pagination,
    isLoading,
    error,
    
    // Actions
    handleFiltersChange,
    handlePageChange,
    resetFilters,
    refetch,
  };
};
