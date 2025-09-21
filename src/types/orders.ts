// TypeScript interfaces for orders
export interface User {
  name: string;
  avatar: string;
  color: string;
}

export interface Order {
  id: string;
  user: User;
  project: string;
  address: string;
  date: string;
  status: 'Complete' | 'In Progress' | 'Pending' | 'Approved' | 'Rejected';
}

export interface OrderFilters {
  search: string;
  status?: string;
  sortBy?: 'date' | 'name' | 'status';
  sortOrder?: 'asc' | 'desc';
}

export interface PaginationInfo {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}
