import React, { useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./column";
import { useQuery } from "react-query";
import api from "../../api";
import * as _ from "lodash";

const Container = styled.div`
  display: flex;
`;

export default () => {
  const [state, setState] = useState<any>();
  const fetchBoardItems = async () => {
    let { data } = await api.sprint.board();
    data = data.map((element: any) => {
      return { ...element, id: `task-${element.id}` };
    });

    let init_data = {
      tasks: data.reduce(
        (acc: any, cur: any) => ({
          ...acc,
          [cur.id]: cur,
        }),
        {}
      ),
      columns: {
        "column-1": {
          id: "column-1",
          title: "To do",
          taskIds: _.map(
            data.filter((x: any) => x.issue_status === "TODO"),
            "id"
          ),
        },
        "column-2": {
          id: "column-2",
          title: "In progress",
          taskIds: _.map(
            data.filter((x: any) => x.issue_status === "BLOCKED"),
            "id"
          ),
        },
        "column-3": {
          id: "column-3",
          title: "Done",
          taskIds: _.map(
            data.filter((x: any) => x.issue_status === "TESTING"),
            "id"
          ),
        },
      },
      // Facilitate reordering of the columns
      columnOrder: ["column-1", "column-2", "column-3"],
    };
    setState(init_data);
    return data;
  };
  const { isLoading, isSuccess, isError, data: projectData } = useQuery(
    "board",
    fetchBoardItems,
    { refetchInterval: false }
  );

  const onDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = state.columns[source.droppableId];
    const finish = state.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn,
        },
      };

      setState(newState);
      return;
    }

    // Moving from one list to another
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    setState(newState);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {state && (
        <Container>
          {state.columnOrder.map((columnId: any) => {
            const column = state.columns[columnId];
            const tasks = column.taskIds.map(
              (taskId: any) => state.tasks[taskId]
            );

            return <Column key={column.id} column={column} tasks={tasks} />;
          })}
        </Container>
      )}
    </DragDropContext>
  );
};
