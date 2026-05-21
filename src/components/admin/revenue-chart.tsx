"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

/* =====================================================================
   RevenueChart · Gráfica de ingresos por mes.
   ===================================================================== */

export function RevenueChart({
  data,
}: {
  data: { month: string; total: number }[];
}) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -12 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e4e8f0" vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tick={{ fontSize: 12, fill: "#5b6577" }}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tick={{ fontSize: 12, fill: "#5b6577" }}
        />
        <Tooltip
          cursor={{ fill: "rgba(143,180,227,0.15)" }}
          formatter={(value) => [`$${Number(value)}`, "Ingresos"]}
          contentStyle={{
            borderRadius: 12,
            border: "1px solid #e4e8f0",
            fontSize: 13,
          }}
        />
        <Bar dataKey="total" fill="#3f6fc2" radius={[6, 6, 0, 0]} maxBarSize={48} />
      </BarChart>
    </ResponsiveContainer>
  );
}
