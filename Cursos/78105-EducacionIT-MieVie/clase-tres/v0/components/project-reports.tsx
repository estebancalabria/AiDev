"use client"

import { Calendar, Download, Filter, PieChart, TrendingUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BurndownChart } from "@/components/burndown-chart"
import { VelocityChart } from "@/components/velocity-chart"
import { TaskDistributionChart } from "@/components/task-distribution-chart"

export function ProjectReports({ projectId }: { projectId: string }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
          <p className="text-muted-foreground">Analyze project performance and metrics</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Tabs defaultValue="sprint" className="w-full">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="sprint">Sprint Reports</TabsTrigger>
              <TabsTrigger value="team">Team Performance</TabsTrigger>
              <TabsTrigger value="project">Project Overview</TabsTrigger>
            </TabsList>
            <Select defaultValue="sprint3">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Sprint" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sprint1">Sprint 1</SelectItem>
                <SelectItem value="sprint2">Sprint 2</SelectItem>
                <SelectItem value="sprint3">Sprint 3 (Current)</SelectItem>
                <SelectItem value="all">All Sprints</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <TabsContent value="sprint" className="space-y-4 mt-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">87%</div>
                  <p className="text-xs text-muted-foreground">+2% from last sprint</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Velocity</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">42 points</div>
                  <p className="text-xs text-muted-foreground">+4 from last sprint</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Scope Changes</CardTitle>
                  <PieChart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+3 tasks</div>
                  <p className="text-xs text-muted-foreground">-2 from last sprint</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Days Remaining</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">5 days</div>
                  <p className="text-xs text-muted-foreground">Sprint ends Nov 11</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Burndown Chart</CardTitle>
                  <CardDescription>Remaining work over sprint duration</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <BurndownChart />
                </CardContent>
              </Card>
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Task Distribution</CardTitle>
                  <CardDescription>Tasks by status and type</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <TaskDistributionChart />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="team" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Team Velocity</CardTitle>
                <CardDescription>Story points completed per sprint</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <VelocityChart />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Team Member Performance</CardTitle>
                <CardDescription>Tasks completed by team member</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="grid grid-cols-12 p-4 text-sm font-medium">
                    <div className="col-span-3">Team Member</div>
                    <div className="col-span-2">Tasks Completed</div>
                    <div className="col-span-2">Story Points</div>
                    <div className="col-span-2">Avg. Completion Time</div>
                    <div className="col-span-3">Contribution</div>
                  </div>
                  <div className="divide-y">
                    {[
                      { name: "John Doe", tasks: 8, points: 24, time: "2.1 days", contribution: 18 },
                      { name: "Jane Smith", tasks: 5, points: 16, time: "1.8 days", contribution: 12 },
                      { name: "Mike Johnson", tasks: 12, points: 38, time: "1.5 days", contribution: 28 },
                      { name: "Sarah Williams", tasks: 7, points: 22, time: "2.3 days", contribution: 16 },
                      { name: "Alex Brown", tasks: 10, points: 32, time: "1.7 days", contribution: 24 },
                    ].map((member, index) => (
                      <div key={index} className="grid grid-cols-12 items-center p-4 text-sm">
                        <div className="col-span-3 font-medium">{member.name}</div>
                        <div className="col-span-2">{member.tasks}</div>
                        <div className="col-span-2">{member.points}</div>
                        <div className="col-span-2">{member.time}</div>
                        <div className="col-span-3">
                          <div className="flex items-center gap-2">
                            <div className="w-full bg-muted rounded-full h-2.5">
                              <div
                                className="bg-primary h-2.5 rounded-full"
                                style={{ width: `${member.contribution}%` }}
                              ></div>
                            </div>
                            <span className="text-xs">{member.contribution}%</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="project" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Project Timeline</CardTitle>
                <CardDescription>Overall project progress and milestones</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div className="flex items-center">
                    <div className="flex flex-col items-center mr-4">
                      <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-full">
                        <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                      </div>
                      <div className="w-px h-full bg-gray-300"></div>
                    </div>
                    <div className="pb-8">
                      <p className="text-sm font-medium">Project Kickoff</p>
                      <p className="text-xs text-muted-foreground">Oct 1, 2023</p>
                      <p className="mt-1 text-sm">Project initialized with team onboarding and initial planning.</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="flex flex-col items-center mr-4">
                      <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-full">
                        <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                      </div>
                      <div className="w-px h-full bg-gray-300"></div>
                    </div>
                    <div className="pb-8">
                      <p className="text-sm font-medium">MVP Development</p>
                      <p className="text-xs text-muted-foreground">Oct 15, 2023</p>
                      <p className="mt-1 text-sm">
                        Core features implemented including user authentication and basic product listing.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="flex flex-col items-center mr-4">
                      <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full">
                        <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                      </div>
                      <div className="w-px h-full bg-gray-300"></div>
                    </div>
                    <div className="pb-8">
                      <p className="text-sm font-medium">Feature Development</p>
                      <p className="text-xs text-muted-foreground">Nov 1, 2023 - Current</p>
                      <p className="mt-1 text-sm">
                        Implementing shopping cart, checkout process, and product search functionality.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="flex flex-col items-center mr-4">
                      <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full">
                        <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                      </div>
                      <div className="w-px h-full bg-gray-300"></div>
                    </div>
                    <div className="pb-8">
                      <p className="text-sm font-medium">Testing & Refinement</p>
                      <p className="text-xs text-muted-foreground">Nov 15, 2023 - Planned</p>
                      <p className="mt-1 text-sm">QA testing, bug fixes, and performance optimization.</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="flex flex-col items-center mr-4">
                      <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full">
                        <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Launch</p>
                      <p className="text-xs text-muted-foreground">Dec 1, 2023 - Planned</p>
                      <p className="mt-1 text-sm">Product launch and post-launch support.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
