import React, { useState } from "react";
import Column from "../../components/Column";
import { DragDropContext } from "react-beautiful-dnd";
import "./styles.css";
import { COLUMNS } from "../../constants/data";

export const KanbanContext = React.createContext();

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;

  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    //find the index where the task is
    const columnsKeys = Object.keys(columns);
    const sourceColumnIndex = columnsKeys.indexOf(source.droppableId);
    const targetColumnIndex = columnsKeys.indexOf(destination.droppableId);

    //Do not move to the left
    if (sourceColumnIndex > targetColumnIndex) {
      return;
    }

    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
  } else {
    const column = columns[source.droppableId];

    const copiedItems = [...column.items];

    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);

    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
};


function Kanban() {
  const [columns, setColumns] = useState(COLUMNS);

  return (
    <KanbanContext.Provider value={{ columns, setColumns }}>
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
      >
        <ul className="kanban__board">
          {Object.entries(columns).map(([key, kbColumn]) => {
            return <li key={key}> <Column columnData={kbColumn}></Column> </li>;
          })}
        </ul>
      </DragDropContext>
    </KanbanContext.Provider>
  );
}

export default Kanban;
