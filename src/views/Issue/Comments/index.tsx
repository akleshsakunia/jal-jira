import { createRef, useRef, useState } from "react";
import AddComments from "./AddComments";
import ListComments from "./ListComments";

export default ({ issueId }: { issueId: number }) => {
  const updateListCommentsFn = createRef<{
    refreshComments(): void;
  }>();

  return (
    <>
      <AddComments
        issueId={issueId}
        updateListComments={() => {
          updateListCommentsFn.current?.refreshComments();
        }}
      />
      <ListComments issueId={issueId} ref={updateListCommentsFn} />
    </>
  );
};
