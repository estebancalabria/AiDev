"use client"

import {
  BarChart,
  Chart,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  XAxis,
  YAxis,
  Bar,
} from "@/components/ui/chart"

// Mock data for velocity chart
const velocityData = [
  { sprint: "Sprint 1", committed: 45, completed: 38 },
  { sprint: "Sprint 2", committed: 50, completed: 42 },
  { sprint: "Sprint 3", committed: 55, completed: 48 },
  { sprint: "Sprint 4", committed: 60, completed: 52 },
  { sprint: "Sprint 5", committed: 65, completed: 58 },
]

export function VelocityChart() {
  return (
    <ChartContainer className="h-80">
      <Chart className="h-full">
        <BarChart data={velocityData}>
          <XAxis dataKey="sprint" />
          <YAxis />
          <ChartTooltip>
            <ChartTooltipContent />
          </ChartTooltip>
          <Bar dataKey="committed" fill="#94a3b8" name="Committed Points" />
          <Bar dataKey="completed" fill="#0ea5e9" name="Completed Points" />
        </BarChart>
      </Chart>
    </ChartContainer>
  )
}
