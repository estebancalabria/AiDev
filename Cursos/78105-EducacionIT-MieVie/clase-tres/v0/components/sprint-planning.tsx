"use client"

import { useState } from "react"
import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { CreateSprintDialog } from "@/components/create-sprint-dialog"

// Mock data for sprints
const sprints = [
  {
    id: "1",
    name: "Sprint 1",
    status: "Completed",
    startDate: "2023-10-01",
    endDate: "2023-10-14",
    progress: 100,
    tasks: {
      total: 24,
      completed: 24,
      inProgress: 0,
      backlog: 0,
    },
    goals: ["Complete user authentication", "Set up basic product listing", "Create initial database schema"],
  },
  {
    id: "2",
    name: "Sprint 2",
    status: "Completed",
    startDate: "2023-10-15",
    endDate: "2023-10-28",
    progress: 100,
    tasks: {
      total: 18,
      completed: 18,
      inProgress: 0,
      backlog: 0,
    },
    goals: ["Implement shopping cart functionality", "Create user profile pages", "Set up payment gateway integration"],
  },
  {
    id: "3",
    name: "Sprint 3",
    status: "In Progress",
    startDate: "2023-10-29",
    endDate: "2023-11-11",
    progress: 65,
    tasks: {
      total: 20,
      completed: 13,
      inProgress: 5,
      backlog: 2,
    },
    goals: ["Complete checkout process", "Implement product search and filtering", "Create admin dashboard"],
  },
  {
    id: "4",
    name: "Sprint 4",
    status: "Planned",
    startDate: "2023-11-12",
    endDate: "2023-11-25",
    progress: 0,
    tasks: {
      total: 22,
      completed: 0,
      inProgress: 0,
      backlog: 22,
    },
    goals: ["Implement order tracking", "Create product reviews and ratings", "Set up analytics and reporting"],
  },
]

// Mock data for backlog items
const backlogItems = [
  {
    id: "1",
    title: "Implement product recommendations",
    description: "Show related products based on user browsing history",
    priority: "Medium",
    estimate: "8 points",
  },
  {
    id: "2",
    title: "Create email notification system",
    description: "Send emails for order confirmations, shipping updates, etc.",
    priority: "High",
    estimate: "13 points",
  },
  {
    id: "3",
    title: "Implement wishlist functionality",
    description: "Allow users to save products to a wishlist",
    priority: "Low",
    estimate: "5 points",
  },
  {
    id: "4",
    title: "Set up inventory management",
    description: "Track product inventory and show out of stock status",
    priority: "High",
    estimate: "13 points",
  },
  {
    id: "5",
    title: "Create product comparison feature",
    description: "Allow users to compare multiple products side by side",
    priority: "Medium",
    estimate: "8 points",
  },
  {
    id: "6",
    title: "Implement discount codes",
    description: "Allow users to apply discount codes at checkout",
    priority: "Medium",
    estimate: "5 points",
  },
  {
    id: "7",
    title: "Set up customer support chat",
    description: "Integrate live chat for customer support",
    priority: "Low",
    estimate: "13 points",
  },
]

export function SprintPlanning({ projectId }: { projectId: string }) {
  const [isCreateSprintOpen, setIsCreateSprintOpen] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Sprint Planning</h1>
          <p className="text-muted-foreground">Manage sprints and backlog items</p>
        </div>
        <Button onClick={() => setIsCreateSprintOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New Sprint
        </Button>
      </div>

      <Tabs defaultValue="sprints" className="space-y-4">
        <TabsList>
          <TabsTrigger value="sprints">Sprints</TabsTrigger>
          <TabsTrigger value="backlog">Backlog</TabsTrigger>
          <TabsTrigger value="capacity">Team Capacity</TabsTrigger>
        </TabsList>
        <TabsContent value="sprints" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {sprints.map((sprint) => (
              <Card key={sprint.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{sprint.name}</CardTitle>
                      <CardDescription>
                        {new Date(sprint.startDate).toLocaleDateString()} -{" "}
                        {new Date(sprint.endDate).toLocaleDateString()}
                      </CardDescription>
                    </div>
                    <div
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        sprint.status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : sprint.status === "In Progress"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {sprint.status}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">Progress</span>
                        <span className="text-sm">{sprint.progress}%</span>
                      </div>
                      <Progress value={sprint.progress} className="h-2" />
                    </div>
                    <div className="grid grid-cols-4 gap-2 text-center">
                      <div className="rounded-md bg-muted p-2">
                        <div className="text-2xl font-bold">{sprint.tasks.total}</div>
                        <div className="text-xs text-muted-foreground">Total</div>
                      </div>
                      <div className="rounded-md bg-green-100 p-2">
                        <div className="text-2xl font-bold text-green-800">{sprint.tasks.completed}</div>
                        <div className="text-xs text-green-800">Done</div>
                      </div>
                      <div className="rounded-md bg-blue-100 p-2">
                        <div className="text-2xl font-bold text-blue-800">{sprint.tasks.inProgress}</div>
                        <div className="text-xs text-blue-800">In Progress</div>
                      </div>
                      <div className="rounded-md bg-gray-100 p-2">
                        <div className="text-2xl font-bold text-gray-800">{sprint.tasks.backlog}</div>
                        <div className="text-xs text-gray-800">Backlog</div>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-2">Sprint Goals:</h4>
                      <ul className="list-disc pl-5 text-sm space-y-1">
                        {sprint.goals.map((goal, index) => (
                          <li key={index}>{goal}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="backlog" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Product Backlog</CardTitle>
                <Button size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Item
                </Button>
              </div>
              <CardDescription>Prioritized list of features and requirements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-12 p-4 text-sm font-medium">
                  <div className="col-span-6">Item</div>
                  <div className="col-span-2">Priority</div>
                  <div className="col-span-2">Estimate</div>
                  <div className="col-span-2">Actions</div>
                </div>
                <div className="divide-y">
                  {backlogItems.map((item) => (
                    <div key={item.id} className="grid grid-cols-12 items-center p-4 text-sm">
                      <div className="col-span-6">
                        <div className="font-medium">{item.title}</div>
                        <div className="text-muted-foreground text-xs mt-1">{item.description}</div>
                      </div>
                      <div className="col-span-2">
                        <div
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                            item.priority === "High"
                              ? "bg-red-100 text-red-800"
                              : item.priority === "Medium"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800"
                          }`}
                        >
                          {item.priority}
                        </div>
                      </div>
                      <div className="col-span-2">{item.estimate}</div>
                      <div className="col-span-2 flex space-x-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          Add to Sprint
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="capacity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Team Capacity</CardTitle>
              <CardDescription>Manage team capacity for sprint planning</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-md border">
                  <div className="grid grid-cols-12 p-4 text-sm font-medium">
                    <div className="col-span-3">Team Member</div>
                    <div className="col-span-2">Role</div>
                    <div className="col-span-2">Capacity (h/day)</div>
                    <div className="col-span-2">Days Available</div>
                    <div className="col-span-3">Total Capacity (points)</div>
                  </div>
                  <div className="divide-y">
                    {[
                      { name: "John Doe", role: "Product Owner", capacity: 6, days: 10, points: 30 },
                      { name: "Jane Smith", role: "Scrum Master", capacity: 4, days: 10, points: 20 },
                      { name: "Mike Johnson", role: "Developer", capacity: 8, days: 10, points: 40 },
                      { name: "Sarah Williams", role: "Designer", capacity: 8, days: 8, points: 32 },
                      { name: "Alex Brown", role: "Developer", capacity: 8, days: 10, points: 40 },
                    ].map((member, index) => (
                      <div key={index} className="grid grid-cols-12 items-center p-4 text-sm">
                        <div className="col-span-3 font-medium">{member.name}</div>
                        <div className="col-span-2">{member.role}</div>
                        <div className="col-span-2">{member.capacity}</div>
                        <div className="col-span-2">{member.days}</div>
                        <div className="col-span-3">{member.points}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-muted p-4 rounded-md">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">Sprint Capacity Summary</h3>
                      <p className="text-sm text-muted-foreground">Next sprint: Nov 12 - Nov 25</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">162 points</div>
                      <p className="text-sm text-muted-foreground">Total team capacity</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <CreateSprintDialog open={isCreateSprintOpen} onOpenChange={setIsCreateSprintOpen} />
    </div>
  )
}
