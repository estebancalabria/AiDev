from datetime import datetime
import uuid

# In-memory data storage for MVP
users = {}
tickets = {}
projects = {}

class User:
    def __init__(self, id, name, email, role="Developer"):
        self.id = id
        self.name = name
        self.email = email
        self.role = role
        self.created_at = datetime.now()

class Ticket:
    def __init__(self, title, description, assignee_id=None, priority="Medium", project_id=None):
        self.id = str(uuid.uuid4())
        self.title = title
        self.description = description
        self.assignee_id = assignee_id
        self.priority = priority  # Low, Medium, High, Critical
        self.status = "To Do"  # To Do, In Progress, Done
        self.project_id = project_id
        self.created_at = datetime.now()
        self.updated_at = datetime.now()

class Project:
    def __init__(self, name, description=""):
        self.id = str(uuid.uuid4())
        self.name = name
        self.description = description
        self.created_at = datetime.now()

# Initialize some default data
def initialize_default_data():
    # Create default users
    user1 = User("1", "John Doe", "john@example.com", "Developer")
    user2 = User("2", "Jane Smith", "jane@example.com", "Designer")
    user3 = User("3", "Mike Johnson", "mike@example.com", "Product Manager")
    
    users[user1.id] = user1
    users[user2.id] = user2
    users[user3.id] = user3
    
    # Create default project
    project1 = Project("Sample Project", "A sample project for demonstration")
    projects[project1.id] = project1
    
    # Create some default tickets
    ticket1 = Ticket("Set up authentication system", "Implement user login and registration functionality", "1", "High", project1.id)
    ticket2 = Ticket("Design landing page", "Create wireframes and mockups for the main landing page", "2", "Medium", project1.id)
    ticket3 = Ticket("Database schema design", "Design and implement the database schema for the application", "1", "High", project1.id)
    ticket4 = Ticket("API documentation", "Write comprehensive API documentation", "3", "Low", project1.id)
    
    # Set some tickets to different statuses
    ticket2.status = "In Progress"
    ticket4.status = "Done"
    
    tickets[ticket1.id] = ticket1
    tickets[ticket2.id] = ticket2
    tickets[ticket3.id] = ticket3
    tickets[ticket4.id] = ticket4

# Initialize data when module is imported
initialize_default_data()

def get_tickets_by_status(status):
    return [ticket for ticket in tickets.values() if ticket.status == status]

def get_tickets_by_assignee(assignee_id):
    return [ticket for ticket in tickets.values() if ticket.assignee_id == assignee_id]

def get_project_tickets(project_id):
    return [ticket for ticket in tickets.values() if ticket.project_id == project_id]

def get_dashboard_stats():
    total_tickets = len(tickets)
    todo_count = len(get_tickets_by_status("To Do"))
    in_progress_count = len(get_tickets_by_status("In Progress"))
    done_count = len(get_tickets_by_status("Done"))
    
    return {
        'total_tickets': total_tickets,
        'todo_count': todo_count,
        'in_progress_count': in_progress_count,
        'done_count': done_count,
        'completion_rate': round((done_count / total_tickets * 100) if total_tickets > 0 else 0, 1)
    }
