import { Order, OrderFilters } from "@/types/orders";

// Mock orders data
const mockOrders: Order[] = [
  {
    id: "#CM9801",
    user: { name: "Natali Craig", avatar: "NC", color: "bg-gray-200" },
    project: "Landing Page",
    address: "Meadow Lane Oakland",
    date: "Just now",
    status: "In Progress",
  },
  {
    id: "#CM9802",
    user: { name: "Kate Morrison", avatar: "KM", color: "bg-gray-200" },
    project: "CRM Admin pages",
    address: "Larry San Francisco",
    date: "A minute ago",
    status: "Complete",
  },
  {
    id: "#CM9803",
    user: { name: "Drew Cano", avatar: "DC", color: "bg-red-500" },
    project: "Client Project",
    address: "Bagwell Avenue Ocala",
    date: "1 hour ago",
    status: "Pending",
  },
  {
    id: "#CM9804",
    user: { name: "Orlando Diggs", avatar: "OD", color: "bg-gray-200" },
    project: "Admin Dashboard",
    address: "Washburn Baton Rouge",
    date: "Yesterday",
    status: "Approved",
  },
  {
    id: "#CM9805",
    user: { name: "Andi Lane", avatar: "AL", color: "bg-gray-200" },
    project: "App Landing Page",
    address: "Nest Lane Olivette",
    date: "Feb 2, 2023",
    status: "Rejected",
  },
  {
    id: "#CM9806",
    user: { name: "John Doe", avatar: "JD", color: "bg-blue-500" },
    project: "E-commerce Site",
    address: "Main Street Boston",
    date: "2 days ago",
    status: "Complete",
  },
  {
    id: "#CM9807",
    user: { name: "Sarah Wilson", avatar: "SW", color: "bg-green-500" },
    project: "Mobile App",
    address: "Oak Avenue Chicago",
    date: "3 days ago",
    status: "In Progress",
  },
  {
    id: "#CM9808",
    user: { name: "Mike Johnson", avatar: "MJ", color: "bg-purple-500" },
    project: "Dashboard Redesign",
    address: "Pine Street Seattle",
    date: "1 week ago",
    status: "Pending",
  },
];

export const getOrders = async (filters: OrderFilters = { search: "" }): Promise<Order[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200));

  let filteredOrders = [...mockOrders];

  // Apply search filter
  if (filters.search) {
    const searchTerm = filters.search.toLowerCase();
    filteredOrders = filteredOrders.filter(order =>
      order.user.name.toLowerCase().includes(searchTerm) ||
      order.project.toLowerCase().includes(searchTerm) ||
      order.id.toLowerCase().includes(searchTerm) ||
      order.address.toLowerCase().includes(searchTerm)
    );
  }

  // Apply status filter
  if (filters.status && filters.status !== 'all') {
    filteredOrders = filteredOrders.filter(order => order.status === filters.status);
  }

  // Apply sorting
  if (filters.sortBy) {
    filteredOrders.sort((a, b) => {
      let aValue: string;
      let bValue: string;

      switch (filters.sortBy) {
        case 'name':
          aValue = a.user.name;
          bValue = b.user.name;
          break;
        case 'status':
          aValue = a.status;
          bValue = b.status;
          break;
        case 'date':
        default:
          aValue = a.date;
          bValue = b.date;
          break;
      }

      const comparison = aValue.localeCompare(bValue);
      return filters.sortOrder === 'desc' ? -comparison : comparison;
    });
  }

  return filteredOrders;
};

export const getOrderStatuses = (): string[] => {
  return ['all', 'Complete', 'In Progress', 'Pending', 'Approved', 'Rejected'];
};
