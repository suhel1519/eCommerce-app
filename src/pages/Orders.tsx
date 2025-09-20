import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, MoreHorizontal, ArrowUpDown, Filter } from "lucide-react";

const orders = [
  {
    id: "ORD001",
    status: "Delivered",
    description: "Next Day",
    amount: "$25.00",
    user: "Landing Page",
    members: "Members List Optional",
    lastModified: "Just now",
    date: "5 minutes ago",
    priority: "Complete",
  },
  {
    id: "ORD002", 
    status: "Delivered",
    description: "Next Morning",
    amount: "$39.00",
    user: "CRM Admin pages",
    members: "Larry Salo Processing",
    lastModified: "2 hours ago",
    date: "1 minute ago",
    priority: "Complete",
  },
  {
    id: "ORD003",
    status: "Processing",
    description: "Next Evening",
    amount: "$89.00", 
    user: "Cart Project",
    members: "Regional Service Guide",
    lastModified: "3 hours ago",
    date: "3 days ago",
    priority: "Complete",
  },
  {
    id: "ORD004",
    status: "Processing",
    description: "Ultimate Magic",
    amount: "$99.00",
    user: "Admin Dashboard",
    members: "Workflow Board Review",
    lastModified: "Yesterday",
    date: "Yesterday", 
    priority: "Complete",
  },
  {
    id: "ORD005",
    status: "Delivered",
    description: "Next Lane",
    amount: "$25.00",
    user: "Landing Page",
    members: "Members List Optional",
    lastModified: "Just now",
    date: "May 4, 2023",
    priority: "Complete",
  },
];

export default function Orders() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortField, setSortField] = useState<"id" | "amount" | "date">("id");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Simulate loading state
  const handleFilter = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 500);
  };

  const handleSort = (field: typeof sortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const filteredAndSortedOrders = orders
    .filter(order => {
      const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           order.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "all" || order.status.toLowerCase() === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      let aValue: string | number = a[sortField];
      let bValue: string | number = b[sortField];
      
      if (sortField === "amount") {
        aValue = parseFloat(a.amount.replace('$', ''));
        bValue = parseFloat(b.amount.replace('$', ''));
      }
      
      if (typeof aValue === 'string') {
        return sortDirection === "asc" 
          ? aValue.localeCompare(bValue as string)
          : (bValue as string).localeCompare(aValue);
      }
      
      return sortDirection === "asc" 
        ? (aValue as number) - (bValue as number)
        : (bValue as number) - (aValue as number);
    });

  const totalPages = Math.ceil(filteredAndSortedOrders.length / itemsPerPage);
  const paginatedOrders = filteredAndSortedOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return <Badge className="bg-success text-success-foreground">Delivered</Badge>;
      case "processing":
        return <Badge variant="secondary">Processing</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between animate-slide-up">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Orders</h1>
          <p className="text-muted-foreground">Manage and track all your orders</p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleFilter}
            className="button-press hover-lift"
            disabled={isLoading}
          >
            {isLoading ? <LoadingSpinner size="sm" /> : <Filter className="h-4 w-4" />}
            Filter
          </Button>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-32 button-press">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card className="hover-lift transition-all duration-300">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">Orders List</CardTitle>
            <div className="relative w-72">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors duration-200" />
              <Input
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 transition-all duration-200 focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <LoadingSpinner size="lg" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <div className="w-8 h-8 rounded bg-muted/50 animate-pulse" />
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="cursor-pointer hover:bg-muted/50 transition-colors duration-200" onClick={() => handleSort("id")}>
                    <div className="flex items-center gap-1 button-press">
                      Order ID
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="cursor-pointer hover:bg-muted/50 transition-colors duration-200" onClick={() => handleSort("amount")}>
                    <div className="flex items-center gap-1 button-press">
                      Amount
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Members</TableHead>
                  <TableHead>Last Modified</TableHead>
                  <TableHead className="cursor-pointer hover:bg-muted/50 transition-colors duration-200" onClick={() => handleSort("date")}>
                    <div className="flex items-center gap-1 button-press">
                      Date
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedOrders.map((order, index) => (
                  <TableRow key={order.id} className="animate-fade-in hover:bg-muted/30 transition-colors duration-200" style={{ animationDelay: `${index * 50}ms` }}>
                    <TableCell>
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center hover-lift transition-all duration-200">
                        <span className="text-xs font-medium text-primary">
                          {String(((currentPage - 1) * itemsPerPage) + index + 1).padStart(2, '0')}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(order.status)}</TableCell>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.description}</TableCell>
                    <TableCell className="font-semibold text-success">{order.amount}</TableCell>
                    <TableCell>{order.user}</TableCell>
                    <TableCell className="text-muted-foreground">{order.members}</TableCell>
                    <TableCell className="text-muted-foreground">{order.lastModified}</TableCell>
                    <TableCell className="text-muted-foreground">{order.date}</TableCell>
                    <TableCell>{order.priority}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover-lift button-press">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
          
          <div className="flex items-center justify-between pt-4 border-t mt-4">
            <p className="text-sm text-muted-foreground">
              Showing {Math.min(paginatedOrders.length, itemsPerPage)} of {filteredAndSortedOrders.length} orders
            </p>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="button-press"
              >
                Previous
              </Button>
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNum = i + 1;
                  return (
                    <Button
                      key={pageNum}
                      variant={pageNum === currentPage ? "default" : "outline"}
                      size="sm"
                      className="h-8 w-8 p-0 button-press hover-lift"
                      onClick={() => setCurrentPage(pageNum)}
                    >
                      {pageNum}
                    </Button>
                  );
                })}
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="button-press"
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}