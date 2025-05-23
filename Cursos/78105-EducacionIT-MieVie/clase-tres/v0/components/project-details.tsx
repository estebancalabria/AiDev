"use client"

import { useState } from "react"
import Link from "next/link"
import { Calendar, CheckCircle2, Edit, MoreHorizontal, Plus, Trash2, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { BurndownChart } from "@/components/burndown-chart"
import { CreateTaskDialog } from "@/components/create-task-dialog"

// Mock project data
const projectData = {
  id: "1",
  name: "E-commerce Platform",
  description: "Building a modern e-commerce platform with React and Node.js",
  progress: 75,
  tasks: { total: 120, completed: 90, inProgress: 20, backlog: 10 },
  team: [
    { id: "1", name: "John Doe", avatar: "/placeholder-user.jpg", role: "Product Owner" },
    { id: "2", name: "Jane Smith", avatar: "/placeholder-user.jpg", role: "Scrum Master" },
    { id: "3", name: "Mike Johnson", avatar: "/placeholder-user.jpg", role: "Developer" },
    { id: "4", name: "Sarah Williams", avatar: "/placeholder-user.jpg", role: "Designer" },
    { id: "5", name: "Alex Brown", avatar: "/placeholder-user.jpg", role: "Developer" },
  ],
  sprints: [
    { id: "1", name: "Sprint 1", status: "Completed", startDate: "2023-10-01", endDate: "2023-10-14" },
    { id: "2", name: "Sprint 2", status: "Completed", startDate: "2023-10-15", endDate: "2023-10-28" },
    { id: "3", name: "Sprint 3", status: "In Progress", startDate: "2023-10-29", endDate: "2023-11-11" },
    { id: "4", name: "Sprint 4", status: "Planned", startDate: "2023-11-12", endDate: "2023-11-25" },
  ],
  recentTasks: [
    { id: "1", title: "Implement user authentication", status: "Completed", assignee: "Mike Johnson" },
    { id: "2", title: "Design product page", status: "In Progress", assignee: "Sarah Williams" },
    { id: "3", title: "Set up payment gateway", status: "In Progress", assignee: "Alex Brown" },
    { id: "4", title: "Create admin dashboard", status: "Backlog", assignee: "Unassigned" },
  ],
}

export function ProjectDetails({ id }: { id: string }) {
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{projectData.name}</h1>
          <p className="text-muted-foreground">{projectData.description}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild variant="outline">
            <Link href={`/projects/${id}/board`}>View Board</Link>
          </Button>
          <Button onClick={() => setIsCreateTaskOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Task
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">More options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem>
                <Edit className="mr-2 h-4 w-4" />
                <span>Edit Project</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Users className="mr-2 h-4 w-4" />
                <span>Manage Team</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                <span>Delete Project</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Progress</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projectData.progress}%</div>
            <Progress value={projectData.progress} className="h-2 mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasks</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <rect width="20" height="14" x="2" y="5" rx="2" />
              <path d="M2 10h20" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projectData.tasks.total}</div>
            <p className="text-xs text-muted-foreground">
              {projectData.tasks.completed} completed, {projectData.tasks.inProgress} in progress
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projectData.team.length}</div>
            <div className="flex -space-x-2 mt-2">
              {projectData.team.slice(0, 5).map((member) => (
                <Avatar key={member.id} className="border-2 border-background h-8 w-8">
                  <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                </Avatar>
              ))}
              {projectData.team.length > 5 && (
                <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-muted text-xs font-medium">
                  +{projectData.team.length - 5}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Sprint</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Sprint 3</div>
            <p className="text-xs text-muted-foreground">Ends in 5 days</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="sprints">Sprints</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Recent Tasks</CardTitle>
                <CardDescription>Latest tasks in this project</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {projectData.recentTasks.map((task) => (
                    <div key={task.id} className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">{task.title}</p>
                        <p className="text-sm text-muted-foreground">Assigned to: {task.assignee}</p>
                      </div>
                      <div
                        className={`text-xs px-2 py-1 rounded-full ${
                          task.status === "Completed"
                            ? "bg-green-100 text-green-800"
                            : task.status === "In Progress"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {task.status}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => setIsCreateTaskOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Task
                </Button>
              </CardFooter>
            </Card>
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Burndown Chart</CardTitle>
                <CardDescription>Task completion over time</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <BurndownChart />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="tasks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Tasks</CardTitle>
              <CardDescription>Manage all tasks in this project</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="space-x-2">
                    <Button variant="outline" size="sm">
                      All
                    </Button>
                    <Button variant="outline" size="sm">
                      To Do
                    </Button>
                    <Button variant="outline" size="sm">
                      In Progress
                    </Button>
                    <Button variant="outline" size="sm">
                      Completed
                    </Button>
                  </div>
                  <Button size="sm" onClick={() => setIsCreateTaskOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    New Task
                  </Button>
                </div>
                <div className="rounded-md border">
                  <div className="grid grid-cols-12 p-4 text-sm font-medium">
                    <div className="col-span-6">Task</div>
                    <div className="col-span-2">Status</div>
                    <div className="col-span-2">Assignee</div>
                    <div className="col-span-2">Due Date</div>
                  </div>
                  <div className="divide-y">
                    {[...projectData.recentTasks, ...projectData.recentTasks].map((task, i) => (
                      <div key={`${task.id}-${i}`} className="grid grid-cols-12 items-center p-4 text-sm">
                        <div className="col-span-6 font-medium">{task.title}</div>
                        <div className="col-span-2">
                          <div
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                              task.status === "Completed"
                                ? "bg-green-100 text-green-800"
                                : task.status === "In Progress"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {task.status}
                          </div>
                        </div>
                        <div className="col-span-2">{task.assignee}</div>
                        <div className="col-span-2 text-muted-foreground">In 3 days</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="team" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
              <CardDescription>Manage team members and their roles</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="space-x-2">
                    <Button variant="outline" size="sm">
                      All Roles
                    </Button>
                    <Button variant="outline" size="sm">
                      Developers
                    </Button>
                    <Button variant="outline" size="sm">
                      Designers
                    </Button>
                  </div>
                  <Button size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Member
                  </Button>
                </div>
                <div className="rounded-md border">
                  <div className="grid grid-cols-12 p-4 text-sm font-medium">
                    <div className="col-span-4">Name</div>
                    <div className="col-span-3">Role</div>
                    <div className="col-span-3">Tasks</div>
                    <div className="col-span-2">Actions</div>
                  </div>
                  <div className="divide-y">
                    {projectData.team.map((member) => (
                      <div key={member.id} className="grid grid-cols-12 items-center p-4 text-sm">
                        <div className="col-span-4 flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                            <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="font-medium">{member.name}</div>
                        </div>
                        <div className="col-span-3">{member.role}</div>
                        <div className="col-span-3">{Math.floor(Math.random() * 10) + 1} active tasks</div>
                        <div className="col-span-2">
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">More options</span>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="sprints" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sprint History</CardTitle>
              <CardDescription>View all sprints for this project</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="space-x-2">
                    <Button variant="outline" size="sm">
                      All Sprints
                    </Button>
                    <Button variant="outline" size="sm">
                      Active
                    </Button>
                    <Button variant="outline" size="sm">
                      Completed
                    </Button>
                  </div>
                  <Button size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    New Sprint
                  </Button>
                </div>
                <div className="rounded-md border">
                  <div className="grid grid-cols-12 p-4 text-sm font-medium">
                    <div className="col-span-3">Sprint</div>
                    <div className="col-span-2">Status</div>
                    <div className="col-span-3">Date Range</div>
                    <div className="col-span-2">Tasks</div>
                    <div className="col-span-2">Actions</div>
                  </div>
                  <div className="divide-y">
                    {projectData.sprints.map((sprint) => (
                      <div key={sprint.id} className="grid grid-cols-12 items-center p-4 text-sm">
                        <div className="col-span-3 font-medium">{sprint.name}</div>
                        <div className="col-span-2">
                          <div
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
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
                        <div className="col-span-3">
                          {new Date(sprint.startDate).toLocaleDateString()} -{" "}
                          {new Date(sprint.endDate).toLocaleDateString()}
                        </div>
                        <div className="col-span-2">{Math.floor(Math.random() * 20) + 5} tasks</div>
                        <div className="col-span-2">
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">More options</span>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <CreateTaskDialog open={isCreateTaskOpen} onOpenChange={setIsCreateTaskOpen} />
    </div>
  )
}
