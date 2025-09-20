import { MetricCard } from "@/components/MetricCard";
import { RevenueChart } from "@/components/RevenueChart";
import { PropertiesChart } from "@/components/PropertiesChart";
import { TopSellingProducts } from "@/components/TopSellingProducts";
import { NotificationsPanel } from "@/components/NotificationsPanel";

const Index = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Analytics Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening with your business today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Customers"
          value="3,781"
          change={{ value: 8.2, isPositive: true }}
        />
        <MetricCard
          title="Orders"
          value="1,219"
          change={{ value: 12.5, isPositive: true }}
        />
        <MetricCard
          title="Revenue"
          value="$695"
          change={{ value: 15.3, isPositive: true }}
        />
        <MetricCard
          title="Growth"
          value="30.1%"
          change={{ value: 2.1, isPositive: true }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <RevenueChart />
            <PropertiesChart />
          </div>
          <TopSellingProducts />
        </div>
        <div className="lg:col-span-1">
          <NotificationsPanel />
        </div>
      </div>
    </div>
  );
};

export default Index;
