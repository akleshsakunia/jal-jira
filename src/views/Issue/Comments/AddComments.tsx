import Title from "antd/es/typography/Title";
import { useContext, useState } from "react";
import { flushSync } from "react-dom";
import api from "../../../api";
import RichTextEditor from "../../../components/RichTextEditor";
import { commentContext } from "./index";

export default ({ issueId }: { issueId: number }) => {
  const [shouldTriggerUpdate, setShouldTriggerUpdate] =
    useContext(commentContext);
  const updateIssue = async (editedVal: string) => {
    const reqData = {
      issue_id: issueId,
      comment: editedVal,
    };
    await api.issues.postComments(reqData);
  };
  const handleOnSave = (editedVal: string) => {
    updateIssue(editedVal);
    setTimeout(() => setShouldTriggerUpdate(!shouldTriggerUpdate), 1000);
  };

  return (
    <>
      <Title level={5}>Add Comments</Title>
      <RichTextEditor
        onSaveClearEditor={true}
        onSave={handleOnSave}
        height="30vh"
        buttonTitle="Add"
      />
    </>
  );
};
