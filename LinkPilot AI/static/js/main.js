// WebSocket connection for real-time updates
let ws = null;

function initWebSocket() {
    ws = new WebSocket(`ws://${window.location.host}/ws`);
    
    ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        updateLinkStatus(data);
    };
    
    ws.onclose = () => {
        setTimeout(initWebSocket, 5000); // Reconnect after 5 seconds
    };
}

// Update link status in real-time
function updateLinkStatus(data) {
    const linkCard = document.getElementById(`link-${data.id}`);
    if (linkCard) {
        const statusElement = linkCard.querySelector('.link-card-status');
        statusElement.className = `link-card-status status-${data.status}`;
        statusElement.textContent = data.status;
        
        // Update preview if available
        if (data.previewUrl) {
            const previewElement = linkCard.querySelector('.link-preview img');
            if (previewElement) {
                previewElement.src = data.previewUrl;
            }
        }
    }
}

// Admin panel functionality
document.addEventListener('DOMContentLoaded', () => {
    // Initialize WebSocket
    initWebSocket();
    
    // Add link form submission
    const addLinkForm = document.getElementById('add-link-form');
    if (addLinkForm) {
        addLinkForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const url = document.getElementById('link-url').value;
            
            try {
                const response = await fetch('/api/links', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ url }),
                });
                
                if (response.ok) {
                    addLinkForm.reset();
                    showNotification('Link added successfully!', 'success');
                } else {
                    showNotification('Failed to add link', 'error');
                }
            } catch (error) {
                showNotification('Network error occurred', 'error');
            }
        });
    }
});

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Link status polling (fallback for non-WebSocket browsers)
function startStatusPolling() {
    setInterval(async () => {
        try {
            const response = await fetch('/api/links/status');
            const data = await response.json();
            data.forEach(updateLinkStatus);
        } catch (error) {
            console.error('Polling error:', error);
        }
    }, 5000);
}

// Mobile menu toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const sidebar = document.querySelector('.sidebar');

if (mobileMenuButton && sidebar) {
    mobileMenuButton.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });
}
