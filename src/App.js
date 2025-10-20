import './App.css';
import { Routes, Route } from 'react-router-dom';
import BoardPage from './pages/BoardPage.js';
import ProjectsPage from './pages/ProjectsPage.js';
import Navbar from './components/Navbar.js';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <Navbar />
      <div className="flex-grow p-6">
        <Routes>
          <Route path="/" element={<ProjectsPage />} />
          <Route path="/board/:projectId" element={<BoardPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
