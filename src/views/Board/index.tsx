import React, { useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./column";
import { useQuery } from "react-query";
import api from "../../api";
import * as _ from "lodash";
import { issueStatus } from "../../utils/globalVars";

const Container = styled.div`
  flex: 1;
`;

const StackedContainer = styled.div`
  display: inline;
  // flex-direction: column;
  flex: 1;
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
        [issueStatus.TODO]: {
          id: issueStatus.TODO,
          title: "TODO",
          taskIds: _.map(
            data.filter((x: any) => x.issue_status === "TODO"),
            "id"
          ),
        },
        [issueStatus.BLOCKED]: {
          id: issueStatus.BLOCKED,
          title: "BLOCKED",
          taskIds: _.map(
            data.filter((x: any) => x.issue_status === "BLOCKED"),
            "id"
          ),
        },
        [issueStatus.IN_PROG]: {
          id: issueStatus.IN_PROG,
          title: "WIP",
          taskIds: _.map(
            data.filter((x: any) => x.issue_status === "IN_PROG"),
            "id"
          ),
        },
        [issueStatus.TESTING]: {
          id: issueStatus.TESTING,
          title: "TESTING",
          taskIds: _.map(
            data.filter((x: any) => x.issue_status === "TESTING"),
            "id"
          ),
        },
        [issueStatus.TESTED]: {
          id: issueStatus.TESTED,
          title: "TESTED",
          taskIds: _.map(
            data.filter((x: any) => x.issue_status === "TESTED"),
            "id"
          ),
        },
        [issueStatus.DONE]: {
          id: issueStatus.DONE,
          title: "DONE",
          taskIds: _.map(
            data.filter((x: any) => x.issue_status === "DONE"),
            "id"
          ),
        },
      },
      // Facilitate reordering of the columns
      columnOrder: [
        issueStatus.TODO,
        [issueStatus.BLOCKED, , issueStatus.IN_PROG],
        [issueStatus.TESTING, issueStatus.TESTED],
        issueStatus.DONE,
      ],
    };
    setState(init_data);
    return data;
  };

  const { isLoading, isSuccess, isError, data: projectData } = useQuery(
    "board",
    fetchBoardItems,
    { refetchInterval: false }
  );

  const updateIssue = async (issueId: any, destStatus: string) => {
    issueId = +issueId.replace("task-", "");
    const reqData = { issue_status: destStatus };
    const res = await api.issues.updateIssue(issueId, reqData);
  };
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
    updateIssue(draggableId, destination?.droppableId);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {state && (
        <div style={{ display: "flex" }}>
          <Container>
            {[issueStatus.TODO].map((col: string) => {
              const column = state.columns[col];
              const tasks = column.taskIds.map(
                (taskId: any) => state.tasks[taskId]
              );

              return <Column key={column.id} column={column} tasks={tasks} />;
            })}
          </Container>
          <StackedContainer>
            {[issueStatus.IN_PROG, issueStatus.BLOCKED].map((col: string) => {
              const column = state.columns[col];
              const tasks = column.taskIds.map(
                (taskId: any) => state.tasks[taskId]
              );
              return <Column key={column.id} column={column} tasks={tasks} />;
            })}
          </StackedContainer>
          <StackedContainer>
            {[issueStatus.TESTING, issueStatus.TESTED].map((col: string) => {
              const column = state.columns[col];
              const tasks = column.taskIds.map(
                (taskId: any) => state.tasks[taskId]
              );
              return <Column key={column.id} column={column} tasks={tasks} />;
            })}
          </StackedContainer>
          <Container>
            {[issueStatus.DONE].map((col: string) => {
              const column = state.columns[col];
              const tasks = column.taskIds.map(
                (taskId: any) => state.tasks[taskId]
              );

              return <Column key={column.id} column={column} tasks={tasks} />;
            })}
          </Container>
        </div>
      )}
    </DragDropContext>
  );
};
