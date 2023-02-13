import api from "../../api";
import RichTextEditor from "../../components/RichTextEditor";
export default ({
  issueId,
  initialVal,
}: {
  issueId: number;
  initialVal: string;
}) => {
  const updateIssue = async (issueId: any, editedVal: string) => {
    const reqData = { description: editedVal };
    const res = await api.issues.updateIssue(issueId, reqData);
  };
  const handleOnSave = (editedVal: string) => updateIssue(issueId, editedVal);
  return <RichTextEditor initialValue={initialVal} onSave={handleOnSave} />;
};
