# 🚀 Kanban Project Manager Frontend

A modern, responsive Kanban board application built with React, featuring drag-and-drop functionality, AI-powered insights, and a beautiful user interface.

![Kanban Project Manager](https://img.shields.io/badge/React-19.2.0-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.18-38B2AC) ![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.9.1-764ABC) ![React DnD](https://img.shields.io/badge/React_DnD-16.0.1-FF6B6B)

## ✨ Features

### 🎯 Core Functionality
- **Drag & Drop**: Intuitive task management with smooth drag-and-drop between columns
- **Project Management**: Create and manage multiple projects with dedicated boards
- **Task Management**: Add, edit, delete, and organize tasks with priority levels
- **Real-time Updates**: Optimistic UI updates with backend synchronization

### 🤖 AI-Powered Features
- **Project Summarization**: Get AI-generated summaries of your project progress
- **Smart Q&A**: Ask questions about your tasks and get intelligent responses
- **Keyboard Shortcuts**: Use Ctrl+Enter to quickly submit AI queries

### 🎨 Modern UI/UX
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Beautiful Gradients**: Modern color schemes with smooth transitions
- **Custom Animations**: Smooth hover effects, drag previews, and transitions
- **Dark/Light Theme**: Clean, professional interface with excellent contrast

## 🛠️ Tech Stack

### Frontend
- **React 19.2.0** - Modern React with hooks and functional components
- **Redux Toolkit** - State management with RTK Query
- **React Router DOM** - Client-side routing
- **React DnD** - Drag and drop functionality
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API requests

### Development Tools
- **Create React App** - Development environment
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing
- **ESLint** - Code linting

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Backend API server running

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory:
   ```env
   REACT_APP_API_URL=http://localhost:8000/api
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🚀 Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Runs the app in development mode |
| `npm run build` | Builds the app for production |
| `npm test` | Launches the test runner |
| `npm run eject` | Ejects from Create React App (one-way operation) |

## 📁 Project Structure

```
src/
├── api/                    # API configuration and endpoints
│   ├── axiosInstance.js    # Axios configuration
│   ├── projectApi.js       # Project-related API calls
│   └── taskApi.js          # Task-related API calls
├── components/             # Reusable UI components
│   ├── Modals/            # Modal components
│   │   ├── ProjectModal.js
│   │   └── TaskModal.js
│   ├── AIFeatures.js       # AI assistant sidebar
│   ├── Card.js            # Task card component
│   ├── Column.js          # Kanban column component
│   ├── CustomDragLayer.js # Custom drag preview
│   ├── KanbanBoard.js     # Main board component
│   ├── Navbar.js          # Navigation bar
│   └── ProjectList.js     # Project listing component
├── pages/                 # Page components
│   ├── BoardPage.js       # Kanban board page
│   └── ProjectsPage.js    # Projects listing page
├── store/                 # Redux store configuration
│   ├── projectSlice.js    # Project state management
│   ├── store.js           # Store configuration
│   └── taskSlice.js       # Task state management
├── utils/                 # Utility functions
│   └── constants.js       # Application constants
├── App.js                 # Main app component
├── App.css                # App-specific styles
├── index.js               # Application entry point
└── index.css              # Global styles
```

## 🎮 Usage Guide

### Creating Projects
1. Click the **"New Project"** button on the projects page
2. Enter project name and description
3. Click **"Create Project"** to save

### Managing Tasks
1. **Add Task**: Click the **"+ Add Task"** button
2. **Edit Task**: Click the three-dot menu on any task card
3. **Delete Task**: Use the delete option in the task menu
4. **Move Task**: Drag and drop tasks between columns

### AI Features
1. **Summarize Project**: Click the green **"Summarize Project"** button
2. **Ask Questions**: Type your question and click **"Ask AI"** or press **Ctrl+Enter**
3. **Clear Data**: Use the **"Clear"** button to reset the AI panel

### Drag & Drop
- **Grab**: Click and hold on any task card
- **Drag**: Move the task to a different column
- **Drop**: Release to place the task in the new column
- **Visual Feedback**: See the task preview and column highlighting

## 🎨 Customization

### Styling
The application uses Tailwind CSS for styling. Key customization areas:

- **Colors**: Modify color schemes in `tailwind.config.js`
- **Components**: Update component styles in individual component files
- **Animations**: Customize transitions in `index.css`

### Adding New Features
1. **New Components**: Add to the `components/` directory
2. **New Pages**: Add to the `pages/` directory
3. **API Integration**: Extend the `api/` directory
4. **State Management**: Update Redux slices in `store/`

## 🔧 Configuration

### API Configuration
Update the API base URL in `src/api/axiosInstance.js`:

```javascript
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  // ... other config
});
```

### Environment Variables
Create a `.env` file with:

```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_AI_API_URL=http://localhost:5000/api/ai
```

## 🐛 Troubleshooting

### Common Issues

**Tasks disappear after drag and drop**
- Check browser console for API errors
- Verify backend API is running
- Ensure proper CORS configuration

**AI features not working**
- Verify AI API endpoints are accessible
- Check network requests in browser dev tools
- Ensure proper API authentication

**Styling issues**
- Clear browser cache
- Restart the development server
- Check Tailwind CSS compilation

### Debug Mode
Enable debug logging by adding to your `.env`:
```env
REACT_APP_DEBUG=true
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team** - For the amazing React framework
- **Tailwind CSS** - For the utility-first CSS framework
- **Redux Team** - For state management tools
- **React DnD** - For drag and drop functionality

## 📞 Support

If you encounter any issues or have questions:

1. Contact the development team (https://chinmoydas.netlify.app/)

---

**Made with ❤️ by the Development Team**

*Happy coding! 🚀*
