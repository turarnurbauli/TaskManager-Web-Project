# TaskManager

## Project Description

TaskManager is a simple and intuitive web application designed to help users organize, track, and manage their daily tasks efficiently. This application provides a clean and user-friendly interface for creating, editing, and managing tasks with features such as due dates, priorities, and task categorization. Built with Node.js and Express.js, TaskManager aims to help users stay productive and never miss an important deadline.

## Team Members

- **Turar Nurbauli** - Group SE2425
- **Alkhan Almas** - Group SE2425

*Please update this section with your actual team member names and group numbers before submission.*

## Topic Explanation

Task management is a fundamental productivity tool that helps individuals and teams organize their work effectively. This application will allow users to:

- Create and manage personal task lists
- Set priorities and due dates for tasks
- Organize tasks by categories or projects
- Track task completion status
- Search and filter tasks for easy access

The application will evolve from a simple static landing page to a full-featured task management system with database integration, user authentication, and advanced features.

## Installation Instructions

1. Ensure you have Node.js installed on your system (version 14 or higher recommended).

2. Clone or download this project to your local machine.

3. Open a terminal/command prompt in the project directory.

4. Install dependencies:
   ```bash
   npm install
   ```

5. Start the server:
   ```bash
   node server.js
   ```

6. Open your web browser and navigate to:
   ```
   http://localhost:3000
   ```

7. Test the routes:
   - Home: http://localhost:3000/
   - About: http://localhost:3000/about
   - Contact: http://localhost:3000/contact
   - Search: http://localhost:3000/search?q=task
   - Item: http://localhost:3000/item/123
   - API Info: http://localhost:3000/api/info
   - Test 404: http://localhost:3000/unknown-page
   
   **Note:** Check the server console to see the logger middleware in action - it logs every request!

## Project Structure

```
project-root/
├── public/
│   └── style.css          # CSS styling for the application
├── views/
│   ├── index.html         # Landing page (Home)
│   ├── about.html         # About page
│   ├── contact.html       # Contact form page
│   ├── search.html        # Search results page
│   ├── item.html          # Item details page
│   └── 404.html           # 404 error page
├── server.js              # Main Express server file
├── package.json           # Node.js dependencies and project metadata
├── messages.json          # JSON file storing contact form submissions (auto-created)
└── README.md              # Project documentation
```

## Development Roadmap

### Week 1 - Project Setup & Landing Page ✅
- Express.js server setup
- Basic project structure
- Landing page with project information
- Basic CSS styling

### Week 2-3 - Routing and Forms ✅
- Implement GET routes: /, /about, /contact
- Create contact form with name, email, and message fields
- Implement POST route for form submission
- Add client-side form validation
- Save form submissions to JSON file (bonus feature)
- Create 404 error page
- Consistent navigation across all pages

### Week 3-4 - Server-side Request Handling ✅
- Custom logger middleware (logs HTTP method + URL)
- Query parameters: /search?q=...
- Route parameters: /item/:id
- JSON API endpoint: /api/info
- Server-side validation (returns 400 for missing parameters)
- Enhanced error handling

### Week 3 - Database Integration
- Set up database (MongoDB or PostgreSQL)
- Connect application to database
- Store and retrieve tasks from database
- Implement data persistence

### Week 4 - CRUD Operations
- Complete Create, Read, Update, Delete operations for tasks
- Enhanced user interface
- Task editing functionality
- Task deletion with confirmation

### Week 5 - Advanced Features & Polish
- Task filtering and search
- Priority and category management
- User authentication (optional)
- Final UI/UX improvements
- Testing and bug fixes

## Routes

### Basic Routes
- **GET /** - Home page (landing page with project overview)
- **GET /about** - About page (team information and project details)
- **GET /contact** - Contact page (displays contact form)
- **POST /contact** - Handles form submissions from the contact page
- **404** - Error page for unknown routes

### Assignment 2 Part 1 Routes
- **GET /search?q=...** - Search page with query parameter
  - Query parameter: `q` (required)
  - Example: `/search?q=task`
  - Returns 400 if query parameter is missing
  
- **GET /item/:id** - Item details page with route parameter
  - Route parameter: `id` (required)
  - Example: `/item/123` or `/item/task-001`
  - Returns 400 if route parameter is missing
  
- **GET /api/info** - API endpoint returning project information in JSON format
  - Returns JSON object with project details, team info, routes, and technologies

## Form Features

The contact form includes:
- **Name field** - Required, minimum 2 characters
- **Email field** - Required, email format validation
- **Message field** - Required, minimum 10 characters, maximum 1000 characters
- **Client-side validation** - Real-time validation before form submission
- **Server-side processing** - Form data is logged and saved to `messages.json`
- **Success response** - User-friendly confirmation page after submission

## Technologies Used

- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **HTML5** - Markup language for structure
- **CSS3** - Styling and layout
- **JavaScript** - Client-side form validation
- **File System (fs)** - For saving form data to JSON file

## Features

### Middleware
- **express.static()** - Serves static files from public directory
- **express.urlencoded()** - Parses form data from POST requests
- **Custom Logger** - Logs HTTP method and URL for every request

### Request Handling
- **Query Parameters** - `/search?q=term` demonstrates `req.query`
- **Route Parameters** - `/item/:id` demonstrates `req.params`
- **Server-side Validation** - Returns HTTP 400 for missing required parameters
- **JSON API Endpoint** - `/api/info` returns structured JSON data

### Error Handling
- Custom 400 error pages for validation failures
- 404 page for unknown routes
- Proper HTTP status codes

## Bonus Features Implemented

✅ **Client-side form validation** - Real-time validation with error messages
✅ **JSON file storage** - Form submissions are saved to `messages.json` file
✅ **Character counter** - Shows character count for message field
✅ **Error styling** - Visual feedback for invalid form fields
✅ **Responsive design** - Works on mobile and desktop devices

## Future Enhancements

- User authentication and personal accounts
- Task reminders and notifications
- Team collaboration features
- Mobile responsive design improvements
- Dark mode theme
- Task statistics and analytics
- Export/import functionality
- Email notifications for form submissions
- Database integration for storing form data

## License

This project is created for educational purposes as part of the Web Development course.


