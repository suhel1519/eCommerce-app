// Common types for reusable components

export interface MetricData {
  title: string;
  value: string | number;
  change?: {
    value: number;
    isPositive: boolean;
  };
  backgroundColor?: string;
}

export interface ChartData {
  month: string;
  value: number;
  height: number;
}

export interface LocationData {
  name: string;
  value: string;
  hasUnderline: boolean;
}

export interface TableColumn {
  key: string;
  label: string;
  align?: "left" | "right" | "center";
}

export interface TableRow {
  [key: string]: string | number;
}

export interface DonutChartSegment {
  name: string;
  value: string;
  color: string;
  strokeDasharray: string;
  strokeDashoffset: string;
}
