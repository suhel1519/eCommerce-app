import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from "recharts";

const data = [
  { month: "Jan", revenue: 4000 },
  { month: "Feb", revenue: 3000 },
  { month: "Mar", revenue: 5000 },
  { month: "Apr", revenue: 2800 },
  { month: "May", revenue: 6000 },
  { month: "Jun", revenue: 7200 },
  { month: "Jul", revenue: 8500 },
  { month: "Aug", revenue: 6800 },
  { month: "Sep", revenue: 9200 },
  { month: "Oct", revenue: 8100 },
  { month: "Nov", revenue: 7500 },
  { month: "Dec", revenue: 9800 },
];

export function RevenueChart() {
  return (
    <Card className="col-span-2">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold">Revenue</CardTitle>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>● Current Year: $94,309</span>
          <span>Previous Year: $80,709</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--chart-primary))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--chart-primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="month" 
                axisLine={false}
                tickLine={false}
                className="text-xs text-muted-foreground"
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                className="text-xs text-muted-foreground"
                tickFormatter={(value) => `$${value}`}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="hsl(var(--chart-primary))"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorRevenue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}