import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { cn } from '@/lib/utils';

interface ChartProps {
  data: {
    name: string;
    total: number;
  }[];
}

export function Chart({ data }: ChartProps) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Bar
          dataKey="total"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className={cn("fill-primary")}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}