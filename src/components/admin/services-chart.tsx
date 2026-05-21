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
   ServicesChart · Gráfica de servicios más vendidos.
   ===================================================================== */

export function ServicesChart({
  data,
}: {
  data: { name: string; count: number }[];
}) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 8, right: 16, bottom: 0, left: 8 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#e4e8f0" horizontal={false} />
        <XAxis
          type="number"
          allowDecimals={false}
          tickLine={false}
          axisLine={false}
          tick={{ fontSize: 12, fill: "#5b6577" }}
        />
        <YAxis
          type="category"
          dataKey="name"
          width={150}
          tickLine={false}
          axisLine={false}
          tick={{ fontSize: 11, fill: "#5b6577" }}
        />
        <Tooltip
          cursor={{ fill: "rgba(143,180,227,0.15)" }}
          formatter={(value) => [`${Number(value)}`, "Pagos"]}
          contentStyle={{
            borderRadius: 12,
            border: "1px solid #e4e8f0",
            fontSize: 13,
          }}
        />
        <Bar dataKey="count" fill="#8fb4e3" radius={[0, 6, 6, 0]} maxBarSize={34} />
      </BarChart>
    </ResponsiveContainer>
  );
}
