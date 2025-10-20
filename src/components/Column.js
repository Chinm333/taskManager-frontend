import React from "react";
import { useDrop } from "react-dnd";
import Card from "./Card";
import { TASK_DRAG_TYPE } from "../utils/constants";
import { useDispatch } from "react-redux";
import { moveTask, fetchTasks, moveTaskLocally } from "../store/taskSlice";

export default function Column({ title, tasks = [], project }) {
  const dispatch = useDispatch();

  const [{ isOver }, drop] = useDrop({
    accept: TASK_DRAG_TYPE,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
    drop: async (item, monitor) => {
      const { _id, status: prevStatus } = item;
      if (prevStatus === title) return; 
      try {
        dispatch(moveTaskLocally({ id: _id, status: title }));
        const result = await dispatch(moveTask({ id: _id, data: { status: title } })).unwrap();
        const taskData = result.data || result;
        if (!taskData || taskData.status !== title) {
          dispatch(fetchTasks(project._id));
        }
        
        return { dropped: true, newStatus: title };
      } catch (err) {
        console.error("Failed to move task", err);
        dispatch(moveTaskLocally({ id: _id, status: prevStatus }));
        dispatch(fetchTasks(project._id));
        throw err; 
      }
    },
  });

  const statusColors = {
    "To Do": "from-gray-100 to-gray-50 border-gray-300",
    "In Progress": "from-blue-100 to-blue-50 border-blue-300",
    "Done": "from-green-100 to-green-50 border-green-300"
  };

  const statusIcons = {
    "To Do": (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
    "In Progress": (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    "Done": (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  };

  return (
    <div
      ref={drop}
      className={`p-4 rounded-lg shadow-md min-h-[500px] bg-gradient-to-b ${statusColors[title] || "from-gray-100 to-gray-50 border-gray-300"} border-2 transition-all ${isOver ? "ring-4 ring-blue-500 ring-opacity-50 scale-[1.02] shadow-2xl bg-blue-100" : ""}`}
    >
      <div className="flex items-center gap-2 mb-4 pb-3 border-b-2 border-gray-300">
        {statusIcons[title]}
        <h3 className="font-bold text-lg text-gray-800">{title}</h3>
        <span className="ml-auto bg-white px-2 py-1 rounded-full text-sm font-semibold text-gray-700 shadow-sm">
          {tasks?.length || 0}
        </span>
      </div>
      <div className="space-y-3">
        {tasks?.map((task) => (
          <Card key={task._id} task={task} project={project} />
        ))}
      </div>
    </div>
  );
}
