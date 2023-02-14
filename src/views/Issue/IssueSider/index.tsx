import { useQuery } from "react-query";
import api from "../../../api";
import { AssigneeInput } from "./AssigneeInput";
import { ReporterInput } from "./ReporterInput";
import { Space } from "antd";
import { PriorityInput } from "./PriorityInput";
import { StartDateInput } from "./StartDateInput";
import { ResolutionDateInput } from "./ResolutionDateInput";
import { EstimateInput } from "./EstimateInput";
import { SprintInput } from "./SprintInput";
import { IssueStatusInput } from "./IssueStatus";

export default ({ issueData }: { issueData: any }) => {
  const updateIssue = async (issueId: any, key: string, value: any) => {
    const res = await api.issues.updateIssue(issueId, { [key]: value });
  };
  const getAllUsers = async (): Promise<any> => {
    let { data } = await api.projects.getAllProjectUsers(+issueData.project);
    const userOptions = data.map((user: any) => ({
      value: user.id,
      label: user.username,
    }));
    return userOptions;
  };

  const {
    isLoading,
    isSuccess,
    isError,
    data: allProjectUsers,
  } = useQuery("getAllUsers", getAllUsers, { refetchInterval: false });

  const handleUpdate = (key: string, value: any) =>
    updateIssue(+issueData.id, key, value);
  return (
    <Space direction="vertical" size={16} style={{ width: "100%" }}>
      <IssueStatusInput
        handleUpdate={handleUpdate}
        currentVal={issueData.issue_status}
      />
      <AssigneeInput
        handleUpdate={handleUpdate}
        currentVal={issueData.assignee}
        allProjectUsers={allProjectUsers}
      />
      <ReporterInput
        handleUpdate={handleUpdate}
        currentVal={issueData.reporter}
        allProjectUsers={allProjectUsers}
      />
      <PriorityInput
        handleUpdate={handleUpdate}
        currentVal={issueData.priority}
      />
      <StartDateInput
        handleUpdate={handleUpdate}
        currentVal={issueData.start_date}
      />
      <ResolutionDateInput
        handleUpdate={handleUpdate}
        currentVal={issueData.resolution_date} // this would be same as due date
      />
      <EstimateInput
        handleUpdate={handleUpdate}
        currentVal={issueData.estimate}
      />
      <SprintInput
        projectKey={issueData.project}
        handleUpdate={handleUpdate}
        currentVal={issueData.sprint}
      />
    </Space>
  );
};
