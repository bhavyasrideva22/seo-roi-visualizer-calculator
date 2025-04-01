
import React, { useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { formatCurrency } from "@/utils/calculatorUtils";

interface Projection {
  month: number;
  traffic: number;
  revenue: number;
}

interface ROIChartProps {
  projections: Projection[];
  timeframe: number;
}

const ROIChart: React.FC<ROIChartProps> = ({ projections, timeframe }) => {
  const [chartType, setChartType] = useState<string>("traffic-revenue");

  // Format data for charts
  const chartData = projections.slice(0, timeframe).map((projection) => ({
    name: `Month ${projection.month}`,
    traffic: projection.traffic,
    revenue: projection.revenue,
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 shadow-md rounded-md">
          <p className="font-bold mb-1">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={`item-${index}`} className="text-sm">
              <span style={{ color: entry.color }}>{entry.name}:</span>{" "}
              {entry.name === "Revenue" ? formatCurrency(entry.value) : entry.value.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full">
      <Tabs defaultValue={chartType} onValueChange={setChartType}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Projected Growth</h3>
          <TabsList>
            <TabsTrigger value="traffic-revenue">Traffic & Revenue</TabsTrigger>
            <TabsTrigger value="traffic">Traffic Growth</TabsTrigger>
            <TabsTrigger value="revenue">Revenue Trend</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="traffic-revenue" className="mt-0">
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis 
                  dataKey="name" 
                  angle={-45} 
                  textAnchor="end" 
                  height={70} 
                  tick={{ fontSize: 12 }}
                />
                <YAxis yAxisId="left" name="Traffic" tick={{ fontSize: 12 }} />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  name="Revenue"
                  tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar
                  yAxisId="left"
                  dataKey="traffic"
                  name="Traffic"
                  fill="#7ac9a7"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  yAxisId="right"
                  dataKey="revenue"
                  name="Revenue"
                  fill="#245e4f"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>
        
        <TabsContent value="traffic" className="mt-0">
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis 
                  dataKey="name" 
                  angle={-45} 
                  textAnchor="end" 
                  height={70} 
                  tick={{ fontSize: 12 }}
                />
                <YAxis name="Traffic" tick={{ fontSize: 12 }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="traffic"
                  name="Traffic"
                  stroke="#245e4f"
                  fill="#7ac9a7"
                  fillOpacity={0.6}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>
        
        <TabsContent value="revenue" className="mt-0">
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis 
                  dataKey="name" 
                  angle={-45} 
                  textAnchor="end" 
                  height={70} 
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`} 
                  tick={{ fontSize: 12 }} 
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  name="Revenue"
                  stroke="#e9c46a"
                  strokeWidth={2}
                  dot={{ fill: "#e9c46a", strokeWidth: 2 }}
                  activeDot={{ r: 6, fill: "#e9c46a", stroke: "#fff" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ROIChart;
