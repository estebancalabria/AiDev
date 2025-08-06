from flask import render_template, request, redirect, url_for, flash, session, jsonify
from app import app
from models import users, tickets, projects, User, Ticket, Project, get_tickets_by_status, get_dashboard_stats
from datetime import datetime
import uuid

@app.route('/')
def index():
    return redirect(url_for('dashboard'))

@app.route('/dashboard')
def dashboard():
    stats = get_dashboard_stats()
    recent_tickets = sorted(tickets.values(), key=lambda x: x.updated_at, reverse=True)[:5]
    return render_template('dashboard.html', stats=stats, recent_tickets=recent_tickets, users=users)

@app.route('/board')
def board():
    todo_tickets = get_tickets_by_status("To Do")
    in_progress_tickets = get_tickets_by_status("In Progress")
    done_tickets = get_tickets_by_status("Done")
    
    return render_template('board.html', 
                         todo_tickets=todo_tickets,
                         in_progress_tickets=in_progress_tickets,
                         done_tickets=done_tickets,
                         users=users)

@app.route('/tickets')
def tickets_list():
    filter_status = request.args.get('status', 'all')
    filter_assignee = request.args.get('assignee', 'all')
    
    filtered_tickets = list(tickets.values())
    
    if filter_status != 'all':
        filtered_tickets = [t for t in filtered_tickets if t.status == filter_status]
    
    if filter_assignee != 'all':
        filtered_tickets = [t for t in filtered_tickets if t.assignee_id == filter_assignee]
    
    return render_template('tickets.html', 
                         tickets=filtered_tickets, 
                         users=users,
                         filter_status=filter_status,
                         filter_assignee=filter_assignee)

@app.route('/tickets/create', methods=['GET', 'POST'])
def create_ticket():
    if request.method == 'POST':
        title = request.form.get('title')
        description = request.form.get('description')
        assignee_id = request.form.get('assignee_id')
        priority = request.form.get('priority', 'Medium')
        
        if not title:
            flash('Title is required', 'error')
            return render_template('tickets.html', users=users, tickets=list(tickets.values()))
        
        # Use the first project for simplicity
        project_id = list(projects.keys())[0] if projects else None
        
        new_ticket = Ticket(title, description, assignee_id, priority, project_id)
        tickets[new_ticket.id] = new_ticket
        
        flash('Ticket created successfully', 'success')
        return redirect(url_for('tickets_list'))
    
    return render_template('tickets.html', users=users, tickets=list(tickets.values()))

@app.route('/tickets/<ticket_id>/edit', methods=['POST'])
def edit_ticket(ticket_id):
    ticket = tickets.get(ticket_id)
    if not ticket:
        flash('Ticket not found', 'error')
        return redirect(url_for('tickets_list'))
    
    ticket.title = request.form.get('title', ticket.title)
    ticket.description = request.form.get('description', ticket.description)
    ticket.assignee_id = request.form.get('assignee_id', ticket.assignee_id)
    ticket.priority = request.form.get('priority', ticket.priority)
    ticket.updated_at = datetime.now()
    
    flash('Ticket updated successfully', 'success')
    return redirect(url_for('tickets_list'))

@app.route('/tickets/<ticket_id>/delete', methods=['POST'])
def delete_ticket(ticket_id):
    if ticket_id in tickets:
        del tickets[ticket_id]
        flash('Ticket deleted successfully', 'success')
    else:
        flash('Ticket not found', 'error')
    
    return redirect(url_for('tickets_list'))

@app.route('/tickets/<ticket_id>/move', methods=['POST'])
def move_ticket(ticket_id):
    ticket = tickets.get(ticket_id)
    if not ticket:
        return jsonify({'error': 'Ticket not found'}), 404
    
    new_status = request.form.get('status')
    if new_status not in ['To Do', 'In Progress', 'Done']:
        return jsonify({'error': 'Invalid status'}), 400
    
    ticket.status = new_status
    ticket.updated_at = datetime.now()
    
    return jsonify({'success': True})

@app.route('/users')
def users_list():
    return render_template('users.html', users=users)

@app.route('/users/create', methods=['POST'])
def create_user():
    name = request.form.get('name')
    email = request.form.get('email')
    role = request.form.get('role', 'Developer')
    
    if not name or not email:
        flash('Name and email are required', 'error')
        return redirect(url_for('users_list'))
    
    # Check if email already exists
    for user in users.values():
        if user.email == email:
            flash('Email already exists', 'error')
            return redirect(url_for('users_list'))
    
    user_id = str(len(users) + 1)
    new_user = User(user_id, name, email, role)
    users[user_id] = new_user
    
    flash('User created successfully', 'success')
    return redirect(url_for('users_list'))

@app.route('/users/<user_id>/delete', methods=['POST'])
def delete_user(user_id):
    if user_id in users:
        # Check if user has assigned tickets
        user_tickets = [t for t in tickets.values() if t.assignee_id == user_id]
        if user_tickets:
            flash('Cannot delete user with assigned tickets', 'error')
        else:
            del users[user_id]
            flash('User deleted successfully', 'success')
    else:
        flash('User not found', 'error')
    
    return redirect(url_for('users_list'))
