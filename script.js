// Event data storage with user tracking
let events = {
    cse: [],
    ece: [],
    mtr: [],
    mech: [],
    it: [],
    ads: [],
    civil: [],
    eee: [],
    biotech: []
};

// Current user session
let currentUser = null;

// Load events from localStorage
function loadEvents() {
    const storedEvents = localStorage.getItem('kcetEvents');
    if (storedEvents) {
        events = JSON.parse(storedEvents);
    }
    
    // Clear any existing events to ensure clean state
    Object.keys(events).forEach(dept => {
        events[dept] = [];
    });
    saveEvents();
}

// Save events to localStorage
function saveEvents() {
    localStorage.setItem('kcetEvents', JSON.stringify(events));
}

// Initialize user session
function initializeUser() {
    const storedUser = localStorage.getItem('kcetCurrentUser');
    if (storedUser) {
        currentUser = JSON.parse(storedUser);
    } else {
        // Prompt for KCET email validation - no anonymous access
        let email = '';
        let isValidEmail = false;
        
        while (!isValidEmail) {
            email = prompt('Please enter your KCET email ID (must end with @kamarajengg.edu.in):');
            
            if (!email) {
                alert('KCET email ID is required to access event management. Please enter a valid @kamarajengg.edu.in email address.');
                continue;
            }
            
            if (email.toLowerCase().endsWith('@kamarajengg.edu.in')) {
                isValidEmail = true;
            } else {
                alert('Invalid email! Only KCET email IDs ending with @kamarajengg.edu.in are allowed.');
            }
        }
        
        // Show terms and conditions
        if (!acceptTermsAndConditions()) {
            return false;
        }
        
        currentUser = {
            id: 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
            email: email,
            name: email.split('@')[0], // Extract name from email
            role: 'event_manager', // All logged-in users are event managers
            agreedToTerms: true,
            agreedAt: new Date().toISOString()
        };
        localStorage.setItem('kcetCurrentUser', JSON.stringify(currentUser));
    }
    
    return true;
}

// Initialize sample events (now empty)
function initializeSampleEvents() {
    // No default events - departments start empty
    // Users can add events using the "+ Add New Event" button
}

// Handle image upload
function handleImageUpload(event, eventId, department) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const eventIndex = events[department].findIndex(ev => ev.id === eventId);
            if (eventIndex !== -1) {
                events[department][eventIndex].image = e.target.result;
                saveEvents();
                displayEvents(department);
            }
        };
        reader.readAsDataURL(file);
    }
}

// Display events for participants (read-only)
function displayParticipantEvents(department) {
    const eventsContainer = document.getElementById('events-container');
    if (!eventsContainer) return;
    
    eventsContainer.innerHTML = '';
    
    if (events[department].length === 0) {
        eventsContainer.innerHTML = `
            <div class="no-events">
                <h3>No Event Available</h3>
                <p>No event currently updated for the ${department.toUpperCase()} department.</p>
                <p>Check back later for upcoming events!</p>
            </div>
        `;
        return;
    }
    
    events[department].forEach(event => {
        const eventCard = document.createElement('div');
        eventCard.className = 'event-card';
        eventCard.innerHTML = `
            <div class="event-image">
                ${event.image ? `<img src="${event.image}" alt="${event.title}">` : `<div class="image-placeholder">📷 No Image</div>`}
            </div>
            <div class="event-info">
                <h3>${event.title}</h3>
                <p class="event-date">📅 ${event.date}</p>
                <p class="event-description">${event.description}</p>
                <p class="event-details">${event.details}</p>
                <p class="event-creator">👤 Organized by: ${event.creatorName}</p>
                <p class="read-only">👁️ View Only - Participant Mode</p>
            </div>
        `;
        eventsContainer.appendChild(eventCard);
    });
}

// Display events for organizers (with edit capabilities)
function displayEvents(department) {
    const eventsContainer = document.getElementById('events-container');
    if (!eventsContainer) return;
    
    eventsContainer.innerHTML = '';
    
    if (events[department].length === 0) {
        eventsContainer.innerHTML = `
            <div class="no-events">
                <h3>No Events Yet</h3>
                <p>Be the first to add an event to the ${department.toUpperCase()} department!</p>
                <button class="add-event-btn" onclick="addEvent('${department}')">+ Add First Event</button>
            </div>
        `;
        return;
    }
    
    events[department].forEach(event => {
        const eventCard = document.createElement('div');
        eventCard.className = 'event-card';
        
        const canEdit = event.createdBy === currentUser.id;
        
        eventCard.innerHTML = `
            <div class="event-image">
                ${event.image ? `<img src="${event.image}" alt="${event.title}">` : `<div class="image-placeholder">📷 Add Image</div>`}
                ${canEdit ? `<input type="file" accept="image/*" onchange="handleImageUpload(event, ${event.id}, '${department}')" class="image-upload">` : ''}
            </div>
            <div class="event-info">
                <h3>${event.title}</h3>
                <p class="event-date">📅 ${event.date}</p>
                <p class="event-description">${event.description}</p>
                <p class="event-details">${event.details}</p>
                <p class="event-creator">👤 Created by: ${event.creatorName}</p>
                ${canEdit ? `<button class="edit-btn" onclick="editEvent(${event.id}, '${department}')">Edit Details</button>` : '<p class="read-only">🔒 Read-only (you can only edit your own events)</p>'}
            </div>
        `;
        eventsContainer.appendChild(eventCard);
    });
}

// Add new event
function addEvent(department) {
    const title = prompt("Enter event title:");
    if (!title) return;
    
    const description = prompt("Enter event description:");
    if (!description) return;
    
    const date = prompt("Enter event date (YYYY-MM-DD):");
    if (!date) return;
    
    const details = prompt("Enter detailed event information:");
    if (!details) return;
    
    const newEvent = {
        id: Date.now(),
        title,
        description,
        date,
        details,
        image: null,
        createdBy: currentUser.id,
        creatorName: currentUser.name,
        createdAt: new Date().toISOString()
    };
    
    events[department].push(newEvent);
    saveEvents();
    displayEvents(department);
}

// Edit event details (only if user created it)
function editEvent(eventId, department) {
    const event = events[department].find(ev => ev.id === eventId);
    if (!event) return;
    
    if (event.createdBy !== currentUser.id) {
        alert('You can only edit events that you created!');
        return;
    }
    
    const title = prompt("Edit event title:", event.title);
    if (title === null) return;
    
    const description = prompt("Edit event description:", event.description);
    if (description === null) return;
    
    const date = prompt("Edit event date (YYYY-MM-DD):", event.date);
    if (date === null) return;
    
    const details = prompt("Edit detailed event information:", event.details);
    if (details === null) return;
    
    const eventIndex = events[department].findIndex(ev => ev.id === eventId);
    events[department][eventIndex] = {
        ...event,
        title: title || event.title,
        description: description || event.description,
        date: date || event.date,
        details: details || event.details
    };
    
    saveEvents();
    displayEvents(department);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    if (!initializeUser()) {
        return; // User cancelled terms or login
    }
    loadEvents();
    initializeSampleEvents();
});
