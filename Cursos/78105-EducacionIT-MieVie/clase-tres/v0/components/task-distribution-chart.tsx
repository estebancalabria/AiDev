"use client"

import { Chart, ChartContainer, ChartTooltip, ChartTooltipContent, PieChart, Pie, Cell } from "@/components/ui/chart"

// Mock data for task distribution chart
const statusData = [
  { name: "Completed", value: 13, color: "#22c55e" },
  { name: "In Progress", value: 5, color: "#3b82f6" },
  { name: "To Do", value: 2, color: "#94a3b8" },
]

const typeData = [
  { name: "Feature", value: 12, color: "#8b5cf6" },
  { name: "Bug", value: 4, color: "#ef4444" },
  { name: "Documentation", value: 2, color: "#f59e0b" },
  { name: "Testing", value: 2, color: "#06b6d4" },
]

export function TaskDistributionChart() {
  return (
    <ChartContainer className="h-80">
      <Chart className="h-full">
        <PieChart>
          <ChartTooltip>
            <ChartTooltipContent />
          </ChartTooltip>
          <Pie
            data={statusData}
            cx="30%"
            cy="50%"
            outerRadius={80}
            dataKey="value"
            nameKey="name"
            label={(entry) => entry.name}
            labelLine={true}
          >
            {statusData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Pie
            data={typeData}
            cx="70%"
            cy="50%"
            outerRadius={80}
            dataKey="value"
            nameKey="name"
            label={(entry) => entry.name}
            labelLine={true}
          >
            {typeData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </Chart>
    </ChartContainer>
  )
}
