import React from "react";
import Column from "./Column";
import CustomDragLayer from "./CustomDragLayer";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function KanbanBoard({ project, tasks }) {
  const columns = project.columns && project.columns.length ? project.columns : ["To Do", "In Progress", "Done"];

  const tasksByStatus = columns.reduce((acc, col) => {
    acc[col] = tasks.filter((t) => t.status === col);
    return acc;
  }, {});

  return (
    <DndProvider backend={HTML5Backend}>
      <CustomDragLayer />
      <div className="flex gap-6 overflow-x-auto pb-6 px-2">
        {columns.map((col) => (
          <div key={col} className="w-80 flex-shrink-0">
            <Column title={col} tasks={tasksByStatus[col] || []} project={project} />
          </div>
        ))}
      </div>
    </DndProvider>
  );
}
