import React from "react";
import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";
import Task from "./task";

const Container = styled.div`
  margin: 0.5em;
  border: 1px solid lightgrey;
  border-radius: 0.5em;
  flex:1
  display: flex;
  flex-direction: column;
`;
const Title = styled.h3`
  padding: 0.2em;
`;
const TaskList = styled.div<{ isDraggingOver: boolean; ref: any }>`
  padding: 0.5em;
  transition: background 0.5s ease;
  background: ${(props: any) => (props.isDraggingOver ? "#3F8D87" : "#E0F1EF")};
  flex-grow: 1;
  min-height: 30vh;
`;

export default (props: any) => {
  return (
    <Container>
      <Title style={{ textAlign: "center" }}>{props.column.title}</Title>
      <Droppable droppableId={props.column.id}>
        {(provided, snapshot) => (
          <TaskList
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {props.tasks.map((task: any, index: any) => (
              <Task key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </TaskList>
        )}
      </Droppable>
    </Container>
  );
};
