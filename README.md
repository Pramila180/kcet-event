# KCET College Events Website

A modern, responsive website for showcasing and managing college events across all departments at KCET.

## Features

- **Department-wise Event Management**: Separate sections for CSE, ECE, MTR, Mechanical, IT, ADS, Civil, EEE, and Bio-Tech departments
- **Two-Column Front Layout**: CSE and ECE departments prominently featured on the homepage
- **Image Upload Support**: Add event pamphlets and images directly from your device
- **Dynamic Event Creation**: Anyone from KCET can add new events with detailed information
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Local Storage**: Events are saved locally and persist between sessions
- **Modern UI**: Beautiful gradient design with smooth animations and hover effects

## Departments Included

1. **Computer Science & Engineering (CSE)**
2. **Electronics & Communication Engineering (ECE)**
3. **Materials Technology (MTR)**
4. **Mechanical Engineering**
5. **Information Technology (IT)**
6. **Artificial Intelligence & Data Science (ADS)**
7. **Civil Engineering**
8. **Electrical & Electronics Engineering (EEE)**
9. **Biotechnology**

## How to Use

1. **View Events**: Navigate to any department page to see current events
2. **Add Images**: Click on the image area to upload event pamphlets
3. **Edit Details**: Use the "Edit Details" button to update event information
4. **Add New Events**: Click the "+ Add New Event" button to create new events
5. **Navigate**: Use the back button or homepage to switch between departments

## File Structure

```
kcet-events/
├── index.html          # Main homepage
├── styles.css          # Main stylesheet
├── department.css      # Department page styles
├── script.js           # JavaScript functionality
├── cse.html           # CSE Department page
├── ece.html           # ECE Department page
├── mtr.html           # MTR Department page
├── mech.html          # Mechanical Department page
├── it.html            # IT Department page
├── ads.html           # ADS Department page
├── civil.html         # Civil Department page
├── eee.html           # EEE Department page
├── biotech.html       # Bio-Tech Department page
└── README.md          # This file
```

## Getting Started

1. Open `index.html` in your web browser to view the website
2. Navigate to different departments using the homepage
3. Add and manage events as needed
4. All changes are saved automatically in your browser's local storage

## Technical Features

- **Pure HTML/CSS/JavaScript**: No external dependencies required
- **LocalStorage API**: Persistent data storage
- **FileReader API**: Image upload functionality
- **Responsive Grid Layout**: Modern CSS Grid and Flexbox
- **CSS Animations**: Smooth transitions and hover effects
- **Mobile-First Design**: Optimized for all screen sizes

## Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Future Enhancements

- Backend integration for centralized data storage
- User authentication and authorization
- Event registration system
- Calendar integration
- Notification system
- Search and filter functionality
