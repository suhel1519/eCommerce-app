import React, { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricCard, BarChart, LineChart, DonutChart, DataTable } from "@/components/common";
import { animations } from "@/lib/animations";
import { useDashboard } from "@/hooks/useDashboard";
import { useNotifications } from "@/hooks/useNotifications";
import { useAppSettings } from "@/hooks/useAppSettings";
import {
  BAR_CHART_DATA,
  LOCATION_DATA,
  TOP_PRODUCTS_DATA,
  PRODUCTS_TABLE_COLUMNS,
  DONUT_CHART_DATA,
  CHART_CONFIG
} from "@/constants";

const Dashboard: React.FC = () => {
  const { metrics, isRefreshing, lastUpdated, refreshMetrics } = useDashboard();
  const { addSuccess, addInfo } = useNotifications();
  const { loading, setLoading } = useAppSettings();

  // Example of using the notification system
  useEffect(() => {
    addInfo("Dashboard Loaded", "Welcome to your eCommerce dashboard!");
  }, [addInfo]);

  // Example of manual refresh
  const handleRefresh = async () => {
    setLoading(true);
    await refreshMetrics();
    addSuccess("Data Refreshed", "Dashboard data has been updated successfully!");
    setLoading(false);
  };

  return (
    <div className="p-6 bg-background min-h-screen transition-colors duration-75">
      <div className={`mb-6 ${animations.entrance.slideDown}`}>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-foreground">eCommerce</h1>
            <p className="text-muted-foreground mt-1">Dashboard overview and analytics</p>
            {lastUpdated && (
              <p className="text-xs text-muted-foreground mt-1">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </p>
            )}
          </div>
          <button
            onClick={handleRefresh}
            disabled={isRefreshing || loading}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50"
          >
            {isRefreshing || loading ? "Refreshing..." : "Refresh Data"}
          </button>
        </div>
      </div>

      {/* Top Section - Metrics Cards and Chart */}
      <div className="flex gap-6 mb-6">
        {/* Left Side - 2x2 Grid of Metric Cards */}
        <div className="grid grid-cols-2 gap-4">
          {metrics.map((metric, index) => (
            <MetricCard
              key={metric.title}
              title={metric.title}
              value={metric.value}
              change={metric.change}
              backgroundColor={metric.backgroundColor}
              animationDelay={`${index * 100}ms`}
            />
          ))}
        </div>

        {/* Right Side - Projections vs Actuals Chart */}
        <Card className={`${animations.entrance.fadeIn} flex-1`}>
          <CardContent className="p-6 h-full">
            <div className="h-full">
              <p className="text-sm font-medium text-gray-600 mb-4">Projections vs Actuals</p>
              <BarChart data={BAR_CHART_DATA} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Revenue Chart */}
        <Card className={`${animations.entrance.fadeIn}`}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Revenue</span>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-black rounded-full mr-2"></div>
                  <span className="text-gray-600">Current Week</span>
                  <span className="font-semibold ml-1">{CHART_CONFIG.currentWeekValue}</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-300 rounded-full mr-2"></div>
                  <span className="text-gray-600">Previous Week</span>
                  <span className="font-semibold ml-1">{CHART_CONFIG.previousWeekValue}</span>
                </div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <LineChart />
          </CardContent>
        </Card>

        {/* Revenue by Location */}
        <Card className={`${animations.entrance.fadeIn}`}>
          <CardHeader>
            <CardTitle>Revenue by Location</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-6">
              {/* World Map */}
              <div className="col-span-2 mb-4">
                <div className="h-32 bg-gray-50 rounded-lg flex items-center justify-center relative">
                  <img
                    src="/WorldMap.svg"
                    alt="World Map"
                    className="w-full h-full object-contain"
                  />
                  {/* Location dots */}
                  <div className="absolute top-6 left-16 w-2 h-2 bg-blue-600 rounded-full"></div>
                  <div className="absolute top-8 left-8 w-2 h-2 bg-blue-600 rounded-full"></div>
                  <div className="absolute bottom-8 right-20 w-2 h-2 bg-blue-600 rounded-full"></div>
                  <div className="absolute top-12 right-12 w-2 h-2 bg-blue-600 rounded-full"></div>
                </div>
              </div>

              {/* Location Stats */}
              <div className="col-span-2 space-y-3">
                {LOCATION_DATA.map((location, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className={`text-gray-600 ${location.hasUnderline ? 'border-b border-blue-500 pb-1' : ''}`}>
                      {location.name}
                    </span>
                    <span className="font-semibold">{location.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Selling Products */}
        <Card className={`${animations.entrance.fadeIn}`}>
          <CardHeader>
            <CardTitle>Top Selling Products</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable 
              columns={PRODUCTS_TABLE_COLUMNS}
              data={TOP_PRODUCTS_DATA}
            />
          </CardContent>
        </Card>

        {/* Total Sales */}
        <Card className={`${animations.entrance.fadeIn}`}>
          <CardHeader>
            <CardTitle>Total Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <DonutChart data={DONUT_CHART_DATA} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
