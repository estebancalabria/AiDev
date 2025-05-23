"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Mock data for activity feed
const activities = [
  {
    id: "1",
    user: {
      name: "John Doe",
      avatar: "/placeholder-user.jpg",
    },
    action: "created a new task",
    target: "Implement user authentication",
    project: "E-commerce Platform",
    time: "2 hours ago",
  },
  {
    id: "2",
    user: {
      name: "Sarah Williams",
      avatar: "/placeholder-user.jpg",
    },
    action: "completed",
    target: "Design product page",
    project: "E-commerce Platform",
    time: "4 hours ago",
  },
  {
    id: "3",
    user: {
      name: "Mike Johnson",
      avatar: "/placeholder-user.jpg",
    },
    action: "commented on",
    target: "Set up payment gateway",
    project: "E-commerce Platform",
    time: "5 hours ago",
    comment: "I've integrated Stripe, but we need to test the webhook functionality.",
  },
  {
    id: "4",
    user: {
      name: "Jane Smith",
      avatar: "/placeholder-user.jpg",
    },
    action: "started Sprint 3",
    project: "E-commerce Platform",
    time: "1 day ago",
  },
  {
    id: "5",
    user: {
      name: "Alex Brown",
      avatar: "/placeholder-user.jpg",
    },
    action: "assigned",
    target: "Create admin dashboard",
    assignee: "Mike Johnson",
    project: "E-commerce Platform",
    time: "1 day ago",
  },
  {
    id: "6",
    user: {
      name: "John Doe",
      avatar: "/placeholder-user.jpg",
    },
    action: "updated the due date of",
    target: "Implement product search",
    project: "E-commerce Platform",
    time: "2 days ago",
    details: "New due date: Nov 15, 2023",
  },
]

export function ProjectActivityFeed() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest actions across all projects</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {activities.map((activity) => (
            <div key={activity.id} className="flex">
              <div className="flex-shrink-0 mr-4">
                <Avatar>
                  <AvatarImage src={activity.user.avatar || "/placeholder.svg"} alt={activity.user.name} />
                  <AvatarFallback>{activity.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center">
                  <p className="text-sm font-medium">
                    <span className="font-semibold">{activity.user.name}</span> {activity.action}{" "}
                    {activity.target && <span className="font-medium">"{activity.target}"</span>}
                    {activity.assignee && <span> to {activity.assignee}</span>}
                  </p>
                </div>
                <p className="text-sm text-muted-foreground">
                  {activity.project} · {activity.time}
                </p>
                {activity.comment && <p className="mt-2 text-sm p-2 bg-muted rounded-md">{activity.comment}</p>}
                {activity.details && <p className="mt-1 text-xs text-muted-foreground">{activity.details}</p>}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
