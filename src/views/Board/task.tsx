import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import Avatar from "antd/lib/avatar/avatar";
import { issueType } from "../../utils/globalVars";
import style from "./index.module.scss";

const Container = styled.div<{ isDragging: boolean; ref: any }>`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${(props) => (props.isDragging ? "lightgreen" : "white")};
`;

export default (props: any) => {
  return (
    <Draggable draggableId={props.task.id} index={props.index}>
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          <div>
            <span className={style.issueText}>
              <span className={style.issueIcon}>
                {issueType[props.task.issue_type]}
              </span>
              {props.task.issue_title}
            </span>
          </div>
        </Container>
      )}
    </Draggable>
  );
};
