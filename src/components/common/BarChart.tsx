import React from "react";

interface BarChartData {
  month: string;
  value: number;
  height: number;
}

interface BarChartProps {
  data: BarChartData[];
  yAxisLabels?: string[];
  barColor?: string;
  barWidth?: string;
  className?: string;
}

export const BarChart: React.FC<BarChartProps> = React.memo(({
  data,
  yAxisLabels = ["30M", "20M", "10M", "0"],
  barColor = "bg-blue-300",
  barWidth = "w-6",
  className = ""
}) => {
  return (
    <div className={`relative h-40 pl-8 ${className}`}>
      {/* Y-axis labels */}
      <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-400">
        {yAxisLabels.map((label, index) => (
          <span key={index}>{label}</span>
        ))}
      </div>
      
      {/* Bar Chart */}
      <div className="h-full flex items-end justify-between space-x-2">
        {data.map((item, index) => (
          <div key={item.month} className="flex flex-col items-center flex-1">
            <div className="w-full flex flex-col items-center mb-2">
              <div 
                className={`${barWidth} ${barColor} rounded-t-sm transition-all duration-300 hover:opacity-80`}
                style={{ height: `${item.height}px` }}
              ></div>
            </div>
            <span className="text-xs text-gray-500 font-medium">{item.month}</span>
          </div>
        ))}
      </div>
    </div>
  );
});

BarChart.displayName = "BarChart";
