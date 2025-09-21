import React from "react";

interface DonutChartData {
  name: string;
  value: string;
  color: string;
  strokeDasharray: string;
  strokeDashoffset: string;
}

interface DonutChartProps {
  data: DonutChartData[];
  centerValue?: string;
  className?: string;
}

export const DonutChart: React.FC<DonutChartProps> = React.memo(({
  data,
  centerValue = "38.6%",
  className = ""
}) => {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="flex items-center justify-center mb-6">
        <div className="relative w-32 h-32">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#f3f4f6"
              strokeWidth="8"
            />
            {data.map((segment, index) => (
              <circle
                key={index}
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke={segment.color}
                strokeWidth="8"
                strokeDasharray={segment.strokeDasharray}
                strokeDashoffset={segment.strokeDashoffset}
              />
            ))}
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xl font-bold text-gray-900">{centerValue}</span>
          </div>
        </div>
      </div>
      
      <div className="space-y-3 w-full">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center">
              <div 
                className="w-3 h-3 rounded-full mr-3"
                style={{ backgroundColor: item.color }}
              ></div>
              <span className="text-gray-600">{item.name}</span>
            </div>
            <span className="font-semibold">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
});

DonutChart.displayName = "DonutChart";
