import Title from "antd/es/typography/Title";
import { useContext, useState } from "react";
import api from "../../../api";
import RichTextEditor from "../../../components/RichTextEditor";
import { commentContext } from "./index";

export default ({ issueId }: { issueId: number }) => {
  const [shouldTriggerUpdate, setShouldTriggerUpdate] =
    useContext(commentContext);
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
    setTimeout(() => setShouldTriggerUpdate(!shouldTriggerUpdate), 1000);
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
