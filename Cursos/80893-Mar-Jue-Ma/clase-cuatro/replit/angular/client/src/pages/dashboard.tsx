import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Task, Sprint, InsertTask, InsertSprint, TaskStatus } from '@shared/schema';
import { KanbanBoard } from '@/components/kanban-board';
import { TaskModal } from '@/components/task-modal';
import { SprintModal } from '@/components/sprint-modal';
import { DragDropProvider } from '@/lib/drag-drop';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

type TabType = 'kanban' | 'backlog' | 'sprints';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<TabType>('kanban');
  const [selectedSprintId, setSelectedSprintId] = useState<string>('all-sprints');
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [sprintModalOpen, setSprintModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>();
  const [editingSprint, setEditingSprint] = useState<Sprint | undefined>();
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch tasks
  const tasksUrl = selectedSprintId && selectedSprintId !== 'all-sprints' 
    ? `/api/tasks?sprintId=${selectedSprintId}`
    : '/api/tasks';
  const { data: tasks = [], isLoading: isLoadingTasks } = useQuery<Task[]>({
    queryKey: [tasksUrl],
  });

  // Fetch sprints
  const { data: sprints = [], isLoading: isLoadingSprints } = useQuery<Sprint[]>({
    queryKey: ['/api/sprints'],
  });

  // Get backlog tasks (tasks not assigned to any sprint)
  const backlogTasks = tasks.filter(task => !task.sprintId);
  
  // Get current sprint tasks
  const currentSprint = selectedSprintId && selectedSprintId !== 'all-sprints' 
    ? sprints.find(s => s.id === selectedSprintId) 
    : sprints.find(s => s.status === 'active');
  const sprintTasks = selectedSprintId && selectedSprintId !== 'all-sprints'
    ? tasks.filter(task => task.sprintId === selectedSprintId)
    : currentSprint 
      ? tasks.filter(task => task.sprintId === currentSprint.id)
      : [];

  // Task mutations
  const createTaskMutation = useMutation({
    mutationFn: (data: InsertTask) => apiRequest('POST', '/api/tasks', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/tasks'] });
      toast({ title: 'Task created successfully' });
    },
    onError: () => {
      toast({ title: 'Failed to create task', variant: 'destructive' });
    },
  });

  const updateTaskMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Task> }) => 
      apiRequest('PATCH', `/api/tasks/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/tasks'] });
      toast({ title: 'Task updated successfully' });
    },
    onError: () => {
      toast({ title: 'Failed to update task', variant: 'destructive' });
    },
  });

  // Sprint mutations
  const createSprintMutation = useMutation({
    mutationFn: (data: InsertSprint) => apiRequest('POST', '/api/sprints', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/sprints'] });
      toast({ title: 'Sprint created successfully' });
    },
    onError: () => {
      toast({ title: 'Failed to create sprint', variant: 'destructive' });
    },
  });

  const updateSprintMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Sprint> }) => 
      apiRequest('PATCH', `/api/sprints/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/sprints'] });
      toast({ title: 'Sprint updated successfully' });
    },
    onError: () => {
      toast({ title: 'Failed to update sprint', variant: 'destructive' });
    },
  });

  const handleTaskMove = (taskId: string, newStatus: TaskStatus) => {
    updateTaskMutation.mutate({ id: taskId, data: { status: newStatus } });
  };

  const handleTaskSubmit = (data: InsertTask) => {
    if (editingTask) {
      updateTaskMutation.mutate({ id: editingTask.id, data });
      setEditingTask(undefined);
    } else {
      createTaskMutation.mutate(data);
    }
  };

  const handleSprintSubmit = (data: InsertSprint) => {
    if (editingSprint) {
      updateSprintMutation.mutate({ id: editingSprint.id, data });
      setEditingSprint(undefined);
    } else {
      createSprintMutation.mutate(data);
    }
  };

  const handleTaskEdit = (task: Task) => {
    setEditingTask(task);
    setTaskModalOpen(true);
  };

  const handleSprintEdit = (sprint: Sprint) => {
    setEditingSprint(sprint);
    setSprintModalOpen(true);
  };

  const assignTaskToSprint = (taskId: string, sprintId: string) => {
    updateTaskMutation.mutate({ id: taskId, data: { sprintId } });
  };

  const getSprintProgress = (sprint: Sprint) => {
    const sprintTaskList = tasks.filter(task => task.sprintId === sprint.id);
    const completedTasks = sprintTaskList.filter(task => task.status === 'done');
    return sprintTaskList.length > 0 ? (completedTasks.length / sprintTaskList.length) * 100 : 0;
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'kanban':
        return (
          <DragDropProvider onTaskMove={handleTaskMove}>
            <div>
              {/* Sprint Info Header */}
              {currentSprint && (
                <Card className="mb-6">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div>
                        <h2 className="text-2xl font-bold text-foreground">{currentSprint.name}</h2>
                        <p className="text-muted-foreground mt-1">{currentSprint.description}</p>
                        <div className="flex items-center space-x-4 mt-3 text-sm text-muted-foreground">
                          <span><i className="fas fa-calendar mr-1"></i>{currentSprint.startDate} - {currentSprint.endDate}</span>
                          <span><i className="fas fa-tasks mr-1"></i>{sprintTasks.length} tasks total</span>
                        </div>
                      </div>
                      <div className="mt-4 md:mt-0 flex items-center space-x-2">
                        <div className={cn(
                          "px-3 py-1 rounded-full text-xs font-medium",
                          currentSprint.status === 'active' ? "bg-primary text-primary-foreground" :
                          currentSprint.status === 'planning' ? "bg-yellow-100 text-yellow-800" :
                          "bg-green-100 text-green-800"
                        )}>
                          {currentSprint.status.charAt(0).toUpperCase() + currentSprint.status.slice(1)}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <KanbanBoard 
                tasks={sprintTasks} 
                onTaskEdit={handleTaskEdit}
              />
            </div>
          </DragDropProvider>
        );

      case 'backlog':
        return (
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-foreground">Product Backlog</h2>
                  <p className="text-muted-foreground mt-1">All tasks waiting to be assigned to sprints</p>
                </div>
                <Button 
                  onClick={() => setTaskModalOpen(true)}
                  data-testid="button-new-task"
                >
                  <i className="fas fa-plus mr-2"></i>New Task
                </Button>
              </div>

              <div className="space-y-3">
                {backlogTasks.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No tasks in backlog. Create a new task to get started.
                  </div>
                ) : (
                  backlogTasks.map(task => (
                    <div key={task.id} className="bg-background border border-border rounded-lg p-4 hover:shadow-sm transition-all">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="font-medium text-foreground">{task.title}</h4>
                            <span className={cn(
                              "px-2 py-1 rounded text-xs font-medium",
                              task.priority === 'high' ? "bg-red-100 text-red-800" :
                              task.priority === 'medium' ? "bg-yellow-100 text-yellow-800" :
                              "bg-green-100 text-green-800"
                            )}>
                              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                            </span>
                            {task.storyPoints && (
                              <span className="bg-muted text-muted-foreground px-2 py-1 rounded text-xs">
                                {task.storyPoints} story points
                              </span>
                            )}
                          </div>
                          {task.description && (
                            <p className="text-muted-foreground text-sm mb-3">{task.description}</p>
                          )}
                          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                            <span><i className="fas fa-user mr-1"></i>{task.assignee || 'Unassigned'}</span>
                            <span><i className="fas fa-calendar mr-1"></i>No sprint</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Select onValueChange={(sprintId) => assignTaskToSprint(task.id, sprintId)}>
                            <SelectTrigger className="w-40">
                              <SelectValue placeholder="Assign to Sprint" />
                            </SelectTrigger>
                            <SelectContent>
                              {sprints.map(sprint => (
                                <SelectItem key={sprint.id} value={sprint.id}>
                                  {sprint.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleTaskEdit(task)}
                            data-testid={`button-edit-backlog-task-${task.id}`}
                          >
                            <i className="fas fa-edit"></i>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        );

      case 'sprints':
        return (
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-foreground">Sprint Management</h2>
                  <p className="text-muted-foreground mt-1">Create and manage development sprints</p>
                </div>
                <Button 
                  onClick={() => setSprintModalOpen(true)}
                  data-testid="button-new-sprint"
                >
                  <i className="fas fa-plus mr-2"></i>Create Sprint
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sprints.length === 0 ? (
                  <div className="col-span-full text-center py-8 text-muted-foreground">
                    No sprints created yet. Create your first sprint to get started.
                  </div>
                ) : (
                  sprints.map(sprint => {
                    const sprintTaskList = tasks.filter(task => task.sprintId === sprint.id);
                    const progress = getSprintProgress(sprint);
                    
                    return (
                      <div 
                        key={sprint.id} 
                        className={cn(
                          "bg-background border rounded-lg p-6",
                          sprint.status === 'active' ? "border-2 border-primary" : "border-border"
                        )}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="font-semibold text-foreground text-lg">{sprint.name}</h3>
                            <span className={cn(
                              "px-2 py-1 rounded text-xs font-medium",
                              sprint.status === 'active' ? "bg-primary text-primary-foreground" :
                              sprint.status === 'planning' ? "bg-yellow-100 text-yellow-800" :
                              "bg-green-100 text-green-800"
                            )}>
                              {sprint.status.charAt(0).toUpperCase() + sprint.status.slice(1)}
                            </span>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleSprintEdit(sprint)}
                            data-testid={`button-edit-sprint-${sprint.id}`}
                          >
                            <i className="fas fa-ellipsis-h"></i>
                          </Button>
                        </div>
                        
                        {sprint.description && (
                          <p className="text-muted-foreground text-sm mb-4">{sprint.description}</p>
                        )}
                        
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Duration:</span>
                            <span className="text-foreground">{sprint.startDate} - {sprint.endDate}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Tasks:</span>
                            <span className="text-foreground">{sprintTaskList.length} total</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Progress:</span>
                            <span className="text-foreground">{Math.round(progress)}%</span>
                          </div>
                        </div>
                        
                        <div className="w-full bg-muted rounded-full h-2 mt-4">
                          <div 
                            className={cn(
                              "h-2 rounded-full transition-all",
                              sprint.status === 'active' ? "bg-primary" :
                              sprint.status === 'completed' ? "bg-green-500" :
                              "bg-yellow-400"
                            )}
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>
                        
                        <div className="flex items-center space-x-2 mt-4">
                          <Button 
                            className="flex-1" 
                            variant={sprint.status === 'active' ? "default" : "secondary"}
                            onClick={() => setSelectedSprintId(sprint.id)}
                            data-testid={`button-view-sprint-${sprint.id}`}
                          >
                            View Sprint
                          </Button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  if (isLoadingTasks || isLoadingSprints) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <i className="fas fa-tasks text-primary text-xl"></i>
                <h1 className="text-xl font-bold text-foreground">Scrum Dashboard</h1>
              </div>
              
              {/* Navigation Tabs */}
              <nav className="hidden md:flex space-x-1 ml-8">
                <button 
                  onClick={() => setActiveTab('kanban')}
                  className={cn(
                    "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                    activeTab === 'kanban' 
                      ? "bg-primary text-primary-foreground" 
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  )}
                  data-testid="tab-kanban"
                >
                  <i className="fas fa-columns mr-2"></i>Kanban Board
                </button>
                <button 
                  onClick={() => setActiveTab('backlog')}
                  className={cn(
                    "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                    activeTab === 'backlog' 
                      ? "bg-primary text-primary-foreground" 
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  )}
                  data-testid="tab-backlog"
                >
                  <i className="fas fa-list mr-2"></i>Product Backlog
                </button>
                <button 
                  onClick={() => setActiveTab('sprints')}
                  className={cn(
                    "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                    activeTab === 'sprints' 
                      ? "bg-primary text-primary-foreground" 
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  )}
                  data-testid="tab-sprints"
                >
                  <i className="fas fa-calendar-alt mr-2"></i>Sprint Management
                </button>
              </nav>
            </div>
            
            <div className="flex items-center space-x-3">
              {/* Sprint Selector */}
              <Select value={selectedSprintId} onValueChange={setSelectedSprintId}>
                <SelectTrigger className="w-48" data-testid="select-current-sprint">
                  <SelectValue placeholder="Select Sprint" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-sprints">All Sprints</SelectItem>
                  {sprints.map(sprint => (
                    <SelectItem key={sprint.id} value={sprint.id}>
                      {sprint.name} - {sprint.status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Button 
                onClick={() => setTaskModalOpen(true)}
                data-testid="button-new-task-header"
              >
                <i className="fas fa-plus mr-2"></i>New Task
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {renderTabContent()}
      </main>

      {/* Task Modal */}
      <TaskModal
        open={taskModalOpen}
        onOpenChange={(open) => {
          setTaskModalOpen(open);
          if (!open) setEditingTask(undefined);
        }}
        task={editingTask}
        sprints={sprints}
        onSubmit={handleTaskSubmit}
      />

      {/* Sprint Modal */}
      <SprintModal
        open={sprintModalOpen}
        onOpenChange={(open) => {
          setSprintModalOpen(open);
          if (!open) setEditingSprint(undefined);
        }}
        sprint={editingSprint}
        onSubmit={handleSprintSubmit}
      />
    </div>
  );
}
