import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../store/taskSlice";
import { getProjectById } from "../api/projectApi";
import KanbanBoard from "../components/KanbanBoard";
import AIFeatures from "../components/AIFeatures";
import TaskModal from "../components/Modals/TaskModal";

export default function BoardPage() {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const tasks = useSelector((s) => s.tasks.data);
  const [project, setProject] = useState(null);
  const [loadingProject, setLoadingProject] = useState(true);

  useEffect(() => {
    if (!projectId) return;
    dispatch(fetchTasks(projectId));
    setLoadingProject(true);
    getProjectById(projectId)
      .then((res) => setProject(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoadingProject(false));
  }, [dispatch, projectId]);

  if (loadingProject) return <p>Loading project...</p>;
  if (!project) return <p>Project not found</p>;

  return (
    <div className="flex gap-6 h-[calc(100vh-64px)]">
      {/* Main Board Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">{project.name}</h2>
              <p className="text-gray-600">{project.description}</p>
            </div>
            <TaskModal projectId={projectId} />
          </div>
        </div>

        {/* Kanban Board */}
        <div className="flex-1 overflow-auto">
          <KanbanBoard project={project} tasks={tasks} />
        </div>
      </div>

      {/* AI Sidebar */}
      <div className="w-96 flex-shrink-0">
        <AIFeatures projectId={projectId} tasks={tasks} />
      </div>
    </div>
  );
}
