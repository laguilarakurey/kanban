import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { KanbanContext } from "../Kanban";
import { useContext } from "react";
import "./styles.css";

const TaskCard = ({ cardData, index }) => {
  const { columns, setColumns } = useContext(KanbanContext);

  const moveTaskRight = (e) => {
    e.preventDefault();

    //find the column where the task is
    var sourceColumn;
    Object.entries(columns).map(([key, kbColumn]) => {
      if (kbColumn.items.find((task) => task.id === cardData.id)) {
        sourceColumn = kbColumn;
      }
      return key;
    });

    const columnsKeys = Object.keys(columns);
    const targetColumnIndex = columnsKeys.indexOf(sourceColumn.id) + 1;

    //Attend to move the task
    if (targetColumnIndex < columnsKeys.length) {
      const destColumn = columns[columnsKeys[targetColumnIndex]];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(index, 1);
      destItems.splice(destItems.length, 0, removed);

      setColumns({
        ...columns,
        [sourceColumn.id]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destColumn.id]: {
          ...destColumn,
          items: destItems,
        },
      });
    }
  };

  return (
    <div key={cardData.id}>
      <Draggable draggableId={cardData.id} index={index}>
        {(provided, snapshot) => {
          return (
            <div
              className="card"
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              style={{
                ...provided.draggableProps.style,
              }}
            >
              <span>{cardData.content}</span>
              <button
                className="card__control"
                type="button"
                onClick={(e) => moveTaskRight(e)}
              >
                Move Right
              </button>
            </div>
          );
        }}
      </Draggable>
    </div>
  );
};

export default TaskCard;
