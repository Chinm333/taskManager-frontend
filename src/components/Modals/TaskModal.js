import React, { useState, useEffect } from "react";
import { createTask as apiCreateTask, updateTask as apiUpdateTask } from "../../api/taskApi";
import { useDispatch } from "react-redux";
import { fetchTasks } from "../../store/taskSlice";
import { DEFAULT_COLUMNS } from "../../utils/constants";

export default function TaskModal({ projectId, existingTask = null, children }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", status: "" });
  const dispatch = useDispatch();

  useEffect(() => {
    if (existingTask) {
      setForm({
        title: existingTask.title || "",
        description: existingTask.description || "",
        status: existingTask.status || "",
      });
    } else {
      setForm({ title: "", description: "", status: "" });
    }
  }, [existingTask, open]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSave = async () => {
    if (!form.title) return alert("Title required");
    if (!form.status) return alert("Status required");
    const idForFetch = projectId || (existingTask && existingTask.projectId);
    try {
      if (existingTask) {
        await apiUpdateTask(existingTask._id, form);
      } else {
        await apiCreateTask(projectId, form);
      }
      dispatch(fetchTasks(idForFetch));
      handleClose();
    } catch (err) {
      console.error(err);
      alert("Failed to save task");
    }
  };

  const trigger = children ? (
    <div onClick={handleOpen} className="block w-full">
      {children}
    </div>
  ) : existingTask ? (
    <button onClick={handleOpen} className="px-2 py-1 border rounded">Edit</button>
  ) : (
    <button onClick={handleOpen} className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg flex items-center gap-2">
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
      </svg>
      Add Task
    </button>
  );

  return (
    <>
      {trigger}

      {open && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-30 animate-fadeIn">
          <div className="bg-white w-[560px] p-8 rounded-2xl shadow-2xl transform transition-all">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                {existingTask ? (
                  <>
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit Task
                  </>
                ) : (
                  <>
                    <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    New Task
                  </>
                )}
              </h3>
              <button 
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  className="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                  placeholder="Enter task title"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  className="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all resize-none"
                  placeholder="Enter task description"
                  rows="4"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  className="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                >
                  <option value="">Select Status</option>
                  {DEFAULT_COLUMNS.map((col) => (
                    <option value={col} key={col}>{col}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-8">
              <button 
                onClick={handleClose} 
                className="px-6 py-2.5 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
              <button 
                onClick={handleSave} 
                className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
              >
                {existingTask ? "Update Task" : "Create Task"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
