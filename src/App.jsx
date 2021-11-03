import { useState, useEffect } from "react";
import "./App.css";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const initialTasks = [
  {
    id: "1",
    text: "React.js",
  },
  {
    id: "2",
    text: "HTML/CSS",
  },
  {
    id: "3",
    text: "AWS",
  },
  {
    id: "4",
    text: "JavaScript",
  },
];

const reorder = (list, startIndex, endIndex) => {
  const result = [...list];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};



function App() {
  const [tasks, setTasks] = useState(initialTasks);

  useEffect(() => {
    setTasks((prevTasks) => reorder(prevTasks, 3, 0));
    setTasks((prevTasks) => reorder(prevTasks, 2, 1));
  }, [])

  const DdndManager = (result) => {
  console.log(result);

  const { source, destination } = result;
  if (!destination) {
    return;
  }
  if (
    source.index === destination.index &&
    source.droppableId === destination.droppableId
  ) {
    return;
  }

  setTasks((prevTasks) =>
    reorder(prevTasks, source.index, destination.index)
  );
}

  return (
    <DragDropContext onDragEnd={DdndManager} >
      <div className="app">
        <h1>Estudiar</h1>
        <Droppable droppableId="tasks" direction="vertical">
          {(droppableProvided) => (
            <ul
              {...droppableProvided.droppableProps}
              ref={droppableProvided.innerRef}
              className="task-container"
            >
              {tasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(draggableProvided) => (
                    <li
                      {...draggableProvided.draggableProps}
                      ref={draggableProvided.innerRef}
                      {...draggableProvided.dragHandleProps}
                      className="task-item"
                    >
                      {task.text}
                    </li>
                  )}
                </Draggable>
              ))}
              {droppableProvided.placeholder}
            </ul>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
}

export default App;