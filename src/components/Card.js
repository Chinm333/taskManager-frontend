import React, { useState, useEffect, useRef } from "react";
import { useDrag } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import { TASK_DRAG_TYPE } from "../utils/constants";
import TaskModal from "./Modals/TaskModal";
import { deleteTask } from "../api/taskApi";
import { useDispatch } from "react-redux";
import { fetchTasks, removeTaskLocally } from "../store/taskSlice";

export default function Card({ task, project }) {
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  const [{ isDragging }, drag, preview] = useDrag({
    type: TASK_DRAG_TYPE,
    item: () => {
      setMenuOpen(false);
      return task;
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (!dropResult) {
        console.log('Drag cancelled - no drop result');
      } else {
        console.log('Drag completed with result:', dropResult);
      }
    },
  });

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);

  const handleDelete = async () => {
    if (!window.confirm("Delete task?")) return;
    dispatch(removeTaskLocally({ id: task._id }));
    try {
      await deleteTask(task._id);
      dispatch(fetchTasks(project._id)); 
    } catch (err) {
      console.error(err);
      alert("Failed to delete task");
    }
  };

  const priorityColors = {
    Low: "bg-blue-100 text-blue-800",
    Medium: "bg-yellow-100 text-yellow-800",
    High: "bg-red-100 text-red-800"
  };

  return (
    <div
      ref={drag}
      className={`p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all border-l-4 ${task.priority === 'High' ? 'border-red-500' : task.priority === 'Medium' ? 'border-yellow-500' : 'border-blue-500'} ${isDragging ? "opacity-30 scale-95 cursor-grabbing" : "cursor-grab hover:scale-102"}`}
      style={{
        transform: isDragging ? 'rotate(3deg)' : 'rotate(0deg)',
      }}
    >
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-semibold text-gray-800 flex-1">{task.title}</h4>
        <div className="ml-2 relative" ref={menuRef}>
          <button 
            onClick={() => setMenuOpen((s) => !s)} 
            className="text-gray-500 hover:text-gray-700 p-1 rounded hover:bg-gray-100 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
            </svg>
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 bg-white border rounded-lg shadow-lg z-10 w-40 overflow-hidden">
              <TaskModal projectId={project._id} existingTask={task}>
                <button 
                  onClick={() => setMenuOpen(false)}
                  className="w-full text-left px-4 py-2 hover:bg-blue-50 flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit
                </button>
              </TaskModal>
              <button onClick={handleDelete} className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 flex items-center gap-2 transition-colors cursor-pointer">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
      
      {task.description && (
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{task.description}</p>
      )}
      
      {task.priority && (
        <div className="flex items-center gap-2">
          <span className={`text-xs px-2 py-1 rounded-full font-medium ${priorityColors[task.priority] || priorityColors.Low}`}>
            {task.priority}
          </span>
        </div>
      )}
    </div>
  );
}
