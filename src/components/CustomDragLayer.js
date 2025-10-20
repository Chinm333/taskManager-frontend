import React from "react";
import { useDragLayer } from "react-dnd";
import { TASK_DRAG_TYPE } from "../utils/constants";

export default function CustomDragLayer() {
  const { isDragging, item, currentOffset } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  }));

  if (!isDragging || !currentOffset) {
    return null;
  }

  const priorityColors = {
    Low: "border-blue-500",
    Medium: "border-yellow-500",
    High: "border-red-500"
  };

  return (
    <div
      style={{
        position: "fixed",
        pointerEvents: "none",
        zIndex: 100,
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
      }}
    >
      <div
        style={{
          transform: `translate(${currentOffset.x}px, ${currentOffset.y}px)`,
        }}
        className="inline-block"
      >
        <div
          className={`p-4 bg-white rounded-lg shadow-2xl border-l-4 w-72 ${
            priorityColors[item?.priority] || priorityColors.Low
          } opacity-90 rotate-3`}
          style={{
            cursor: "grabbing",
          }}
        >
          <h4 className="font-semibold text-gray-800 mb-1">{item?.title}</h4>
          {item?.description && (
            <p className="text-sm text-gray-600 line-clamp-2">{item?.description}</p>
          )}
          {item?.priority && (
            <div className="mt-2">
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                item.priority === 'High' ? 'bg-red-100 text-red-800' :
                item.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-blue-100 text-blue-800'
              }`}>
                {item.priority}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

