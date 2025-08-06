// Kanban Board Drag and Drop Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize sortable for each column
    const columns = ['todo-cards', 'in-progress-cards', 'done-cards'];
    
    columns.forEach(columnId => {
        const column = document.getElementById(columnId);
        if (column) {
            new Sortable(column, {
                group: 'kanban',
                animation: 150,
                ghostClass: 'sortable-ghost',
                chosenClass: 'sortable-chosen',
                dragClass: 'sortable-drag',
                onEnd: function(evt) {
                    handleTicketMove(evt);
                }
            });
        }
    });
    
    function handleTicketMove(evt) {
        const ticketId = evt.item.getAttribute('data-ticket-id');
        const newStatus = evt.to.getAttribute('data-status');
        const oldStatus = evt.from.getAttribute('data-status');
        
        // If the status hasn't changed, don't make API call
        if (newStatus === oldStatus) {
            return;
        }
        
        // Show loading state
        evt.item.classList.add('loading');
        
        // Create form data
        const formData = new FormData();
        formData.append('status', newStatus);
        
        // Make the API call to update ticket status
        fetch(`/tickets/${ticketId}/move`, {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Update the badge count for each column
                updateColumnCounts();
                
                // Show success feedback
                showNotification('Ticket moved successfully!', 'success');
                
                // Add animation class
                evt.item.classList.add('fade-in');
                setTimeout(() => {
                    evt.item.classList.remove('fade-in');
                }, 300);
            } else {
                // Revert the move on error
                evt.from.appendChild(evt.item);
                showNotification('Failed to move ticket. Please try again.', 'error');
            }
        })
        .catch(error => {
            console.error('Error moving ticket:', error);
            // Revert the move on error
            evt.from.appendChild(evt.item);
            showNotification('Failed to move ticket. Please try again.', 'error');
        })
        .finally(() => {
            // Remove loading state
            evt.item.classList.remove('loading');
        });
    }
    
    function updateColumnCounts() {
        // Update badge counts for each column
        columns.forEach(columnId => {
            const column = document.getElementById(columnId);
            if (column) {
                const count = column.querySelectorAll('.ticket-card').length;
                const badge = column.parentElement.querySelector('.badge');
                if (badge) {
                    badge.textContent = count;
                }
            }
        });
    }
    
    function showNotification(message, type) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `alert alert-${type === 'error' ? 'danger' : 'success'} alert-dismissible fade show notification`;
        notification.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            z-index: 1050;
            min-width: 300px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        `;
        notification.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        // Add to page
        document.body.appendChild(notification);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 3000);
    }
    
    // Add hover effects for better UX
    document.querySelectorAll('.ticket-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Clear any active drag operations
            document.querySelectorAll('.sortable-chosen').forEach(el => {
                el.classList.remove('sortable-chosen');
            });
        }
    });
    
    // Add visual feedback for drop zones
    columns.forEach(columnId => {
        const column = document.getElementById(columnId);
        if (column) {
            column.addEventListener('dragover', function(e) {
                e.preventDefault();
                this.style.backgroundColor = 'rgba(0, 82, 204, 0.05)';
                this.style.border = '2px dashed #0052CC';
            });
            
            column.addEventListener('dragleave', function(e) {
                if (!this.contains(e.relatedTarget)) {
                    this.style.backgroundColor = '';
                    this.style.border = '';
                }
            });
            
            column.addEventListener('drop', function(e) {
                this.style.backgroundColor = '';
                this.style.border = '';
            });
        }
    });
});
