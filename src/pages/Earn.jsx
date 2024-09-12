import React, { useState } from "react";
import { FaYoutube, FaTwitter, FaCheck } from "react-icons/fa";
import { FaQuestion } from "react-icons/fa6";

function Earn() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      icon: "youtube",
      name: "Xem video YouTube",
      points: 100,
      completed: false,
    },
    {
      id: 2,
      icon: "twitter",
      name: "Theo dõi Twitter",
      points: 50,
      completed: false,
    },
    {
      id: 3,
      icon: "question",
      name: "Trả lời câu hỏi",
      points: 75,
      completed: true,
    },
  ]);

  const getIcon = (iconName) => {
    switch (iconName) {
      case "youtube":
        return <FaYoutube />;
      case "twitter":
        return <FaTwitter />;
      case "question":
        return <FaQuestion />;
      default:
        return null;
    }
  };

  const handleTaskAction = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: true } : task
      )
    );
  };

  return (
    <div className="earn-container">
      <h1>Earn Points</h1>
      <div className="task-list">
        {tasks.map((task) => (
          <div key={task.id} className="task-item">
            <div className="task-icon">{getIcon(task.icon)}</div>
            <div className="task-info">
              <div className="task-name">{task.name}</div>
              <div className="task-points">{task.points} điểm</div>
            </div>
            {task.completed ? (
              <div className="task-completed">
                <FaCheck style={{ color: "green", fontSize: "20px" }} />
              </div>
            ) : (
              <button
                className="task-button start"
                onClick={() => handleTaskAction(task.id)}
              >
                Start
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Earn;
