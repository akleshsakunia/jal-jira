import Title from "antd/es/typography/Title";
import { useState } from "react";
import api from "../../../api";
import RichTextEditor from "../../../components/RichTextEditor";

export default ({
  issueId,
  updateListComments,
}: {
  issueId: number;
  updateListComments: () => void;
}) => {
  const [initialValue, setInitialValue] = useState("");
  const updateIssue = async (editedVal: string) => {
    const reqData = {
      issue_id: issueId,
      comment: editedVal,
    };
    await api.issues.postComments(reqData).then(() => setInitialValue(""));
  };
  const handleOnSave = (editedVal: string) => {
    updateIssue(editedVal);
    updateListComments();
  };

  return (
    <>
      <Title level={5}>Add Comments</Title>
      <RichTextEditor
        initialValue={initialValue}
        onSave={handleOnSave}
        height="30vh"
        buttonTitle="Add"
      />
    </>
  );
};
