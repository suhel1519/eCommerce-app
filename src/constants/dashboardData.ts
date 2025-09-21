// Dashboard data constants
export const DASHBOARD_METRICS = [
  {
    title: "Customers",
    value: "3,781",
    change: { value: 11.01, isPositive: true },
    backgroundColor: "bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800"
  },
  {
    title: "Orders", 
    value: "1,219",
    change: { value: 0.03, isPositive: false },
    backgroundColor: "bg-card border-border"
  },
  {
    title: "Revenue",
    value: "$695", 
    change: { value: 15.03, isPositive: true },
    backgroundColor: "bg-card border-border"
  },
  {
    title: "Growth",
    value: "30.1%",
    change: { value: 6.08, isPositive: true },
    backgroundColor: "bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800"
  }
];

export const BAR_CHART_DATA = [
  { month: 'Jan', value: 20, height: 50 },
  { month: 'Feb', value: 25, height: 70 },
  { month: 'Mar', value: 22, height: 60 },
  { month: 'Apr', value: 28, height: 85 },
  { month: 'May', value: 18, height: 45 },
  { month: 'Jun', value: 26, height: 75 }
];

export const LOCATION_DATA = [
  { name: "New York", value: "72K", hasUnderline: false },
  { name: "San Francisco", value: "39K", hasUnderline: true },
  { name: "Sydney", value: "25K", hasUnderline: false },
  { name: "Singapore", value: "61K", hasUnderline: true }
];

export const TOP_PRODUCTS_DATA = [
  { name: "ASOS Ridley High Waist", price: "$79.49", quantity: "82", amount: "$6,518.18" },
  { name: "Marco Lightweight Shirt", price: "$128.50", quantity: "37", amount: "$4,754.50" },
  { name: "Half Sleeve Shirt", price: "$39.99", quantity: "64", amount: "$2,559.36" },
  { name: "Lightweight Jacket", price: "$20.00", quantity: "184", amount: "$3,680.00" },
  { name: "Marco Shoes", price: "$79.49", quantity: "64", amount: "$1,965.81" }
];

export const PRODUCTS_TABLE_COLUMNS = [
  { key: "name", label: "Name", align: "left" as const },
  { key: "price", label: "Price", align: "left" as const },
  { key: "quantity", label: "Quantity", align: "left" as const },
  { key: "amount", label: "Amount", align: "right" as const }
];

export const DONUT_CHART_DATA = [
  {
    name: "Direct",
    value: "$300.56",
    color: "#1f2937",
    strokeDasharray: "96.7 154.3",
    strokeDashoffset: "0"
  },
  {
    name: "Affiliate", 
    value: "$135.18",
    color: "#10b981",
    strokeDasharray: "50 201",
    strokeDashoffset: "-96.7"
  },
  {
    name: "Sponsored",
    value: "$154.02", 
    color: "#3b82f6",
    strokeDasharray: "62 189",
    strokeDashoffset: "-146.7"
  },
  {
    name: "E-mail",
    value: "$48.96",
    color: "#93c5fd", 
    strokeDasharray: "42.3 208.7",
    strokeDashoffset: "-208.7"
  }
];

export const CHART_CONFIG = {
  yAxisLabels: ["30M", "20M", "10M", "0"],
  xAxisLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  currentWeekValue: "$58,211",
  previousWeekValue: "$68,768"
};
