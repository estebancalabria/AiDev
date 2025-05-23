"use client"

import type * as React from "react"
import {
  LineChart as RechartsLineChart,
  Line as RechartsLine,
  XAxis as RechartsXAxis,
  YAxis as RechartsYAxis,
  Tooltip as RechartsTooltip,
  PieChart as RechartsPieChart,
  Pie as RechartsPie,
  Cell as RechartsCell,
  BarChart as RechartsBarChart,
  Bar as RechartsBar,
} from "recharts"

type ChartContainerProps = {
  children: React.ReactNode
  className?: string
}

export const ChartContainer = ({ children, className }: ChartContainerProps) => {
  return <div className={className}>{children}</div>
}

type ChartProps = {
  children: React.ReactNode
  className?: string
}

export const Chart = ({ children, className }: ChartProps) => {
  return <div className={className}>{children}</div>
}

export const LineChart = RechartsLineChart
export const Line = RechartsLine
export const XAxis = RechartsXAxis
export const YAxis = RechartsYAxis
export const PieChart = RechartsPieChart
export const Pie = RechartsPie
export const Cell = RechartsCell
export const BarChart = RechartsBarChart
export const Bar = RechartsBar

type ChartTooltipProps = {
  children?: React.ReactNode
}

export const ChartTooltip = ({ children }: ChartTooltipProps) => {
  return <RechartsTooltip contentStyle={{ background: "#fff", border: "1px solid #ccc" }} />
}

type ChartTooltipContentProps = {
  children?: React.ReactNode
}

export const ChartTooltipContent = ({ children }: ChartTooltipContentProps) => {
  return null
}
