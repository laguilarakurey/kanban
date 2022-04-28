import React from "react";
import { Droppable } from "react-beautiful-dnd";
import TaskCard from '../TaskCard';
import './styles.css';
const Column = ({ columnData, key }) => {
  return (
    <ul>
      <h3 className="column__header">{columnData.name}</h3>
      <Droppable droppableId={columnData.id}>
        {(provided, snapshot) => {
          return (
            <div
                key={columnData.id}
                className="column"
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{
                background: snapshot.isDraggingOver ?  "#A2DBFA" : "lightgray",
                borderColor: snapshot.isDraggingOver ? '#39A2DB':'lightgray'
                
              }}
            >
              {columnData.items.map((item, index) => {
                return (
                  <li key={index}><TaskCard cardData={item} index={index}></TaskCard></li>
                );
              })}
              {provided.placeholder}
            </div>
          );
        }}
      </Droppable>
    </ul>
  );
};

export default Column;
