import React from "react";

interface LineChartProps {
  yAxisLabels?: string[];
  xAxisLabels?: string[];
  currentWeekValue?: string;
  previousWeekValue?: string;
  className?: string;
}

export const LineChart: React.FC<LineChartProps> = React.memo(({
  yAxisLabels = ["30M", "20M", "10M", "0"],
  xAxisLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  currentWeekValue = "$58,211",
  previousWeekValue = "$68,768",
  className = ""
}) => {
  return (
    <div className={`relative h-64 ${className}`}>
      {/* Y-axis labels */}
      <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-400 -ml-2">
        {yAxisLabels.map((label, index) => (
          <span key={index}>{label}</span>
        ))}
      </div>
      
      {/* Chart area */}
      <div className="ml-8 h-full relative">
        <svg className="w-full h-full" viewBox="0 0 400 200">
          {/* Grid lines */}
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#f3f4f6" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Current Week Line (Black) */}
          <path
            d="M 20 120 Q 80 80 120 100 T 200 60 T 280 40 T 360 30"
            fill="none"
            stroke="black"
            strokeWidth="3"
            strokeDasharray="5,5"
          />

          {/* Previous Week Line (Blue) */}
          <path
            d="M 20 160 Q 80 140 120 120 T 200 140 T 280 120 T 360 100"
            fill="none"
            stroke="#93c5fd"
            strokeWidth="3"
          />
        </svg>

        {/* X-axis labels */}
        <div className="flex justify-between text-xs text-gray-400 mt-2">
          {xAxisLabels.map((label, index) => (
            <span key={index}>{label}</span>
          ))}
        </div>
      </div>
    </div>
  );
});

LineChart.displayName = "LineChart";
