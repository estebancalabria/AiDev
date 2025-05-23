"use client"

import {
  Chart,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "@/components/ui/chart"

// Mock data for burndown chart
const burndownData = [
  { day: "Day 1", remaining: 120, ideal: 120 },
  { day: "Day 2", remaining: 118, ideal: 112 },
  { day: "Day 3", remaining: 115, ideal: 104 },
  { day: "Day 4", remaining: 110, ideal: 96 },
  { day: "Day 5", remaining: 105, ideal: 88 },
  { day: "Day 6", remaining: 95, ideal: 80 },
  { day: "Day 7", remaining: 85, ideal: 72 },
  { day: "Day 8", remaining: 75, ideal: 64 },
  { day: "Day 9", remaining: 65, ideal: 56 },
  { day: "Day 10", remaining: 55, ideal: 48 },
  { day: "Day 11", remaining: 45, ideal: 40 },
  { day: "Day 12", remaining: 42, ideal: 32 },
  { day: "Day 13", remaining: 42, ideal: 24 },
  { day: "Day 14", remaining: 42, ideal: 16 },
  { day: "Day 15", remaining: 42, ideal: 8 },
  { day: "Day 16", remaining: 42, ideal: 0 },
]

export function BurndownChart() {
  return (
    <ChartContainer className="h-80">
      <Chart className="h-full">
        <LineChart data={burndownData}>
          <XAxis dataKey="day" />
          <YAxis />
          <ChartTooltip>
            <ChartTooltipContent />
          </ChartTooltip>
          <Line
            type="monotone"
            dataKey="remaining"
            stroke="#f97316"
            strokeWidth={2}
            activeDot={{ r: 6 }}
            name="Actual Remaining"
          />
          <Line
            type="monotone"
            dataKey="ideal"
            stroke="#6b7280"
            strokeWidth={2}
            strokeDasharray="5 5"
            name="Ideal Burndown"
          />
        </LineChart>
      </Chart>
    </ChartContainer>
  )
}
