import { useDispatch } from "react-redux";
import { removeProject } from "../store/projectSlice";
import { Link } from "react-router-dom";
import ProjectModal from "./Modals/ProjectModal";

export default function ProjectList({ projects = [], loading = false }) {
  const dispatch = useDispatch();

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {projects.map((p) => (
        <div 
          key={p._id} 
          className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-6 border-l-4 border-indigo-500 group"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors">
                {p.name}
              </h2>
              <p className="text-sm text-gray-600 line-clamp-2">{p.description || "No description provided"}</p>
            </div>
            <div className="flex items-center gap-2 ml-4">
              <Link 
                to={`/board/${p._id}`} 
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
                Open
              </Link>
              <button
                onClick={() => {
                  if (window.confirm("Are you sure you want to delete this project?")) {
                    dispatch(removeProject(p._id));
                  }
                }}
                className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                title="Delete project"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <span>Board</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
