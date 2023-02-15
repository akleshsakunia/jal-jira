import { Select, Typography } from "antd";
import { useQuery } from "react-query";
import api from "../../../api";

export const SprintInput = ({
  projectKey,
  handleUpdate,
  currentVal,
}: {
  projectKey: number;
  handleUpdate: (key: string, value: any) => void;
  currentVal: string;
}) => {
  const getAllActiveSprintsInCurrentProject = async (): Promise<any> => {
    let { data } = await api.projects.getAllProjectSprints(projectKey);
    const sprintOptions = data.map((sprint: any) => ({
      value: sprint.id,
      label: sprint.id,
    }));
    return sprintOptions;
  };

  const { data: allActiveSprints } = useQuery(
    "getAllActiveSprintsInCurrentProject",
    getAllActiveSprintsInCurrentProject,
    {
      refetchInterval: false,
    }
  );
  const handleChange = (value: string) => {
    handleUpdate("sprint", value || null);
  };
  return (
    <>
      <Typography.Title level={5} style={{ margin: 0 }}>
        Sprint
      </Typography.Title>
      <Select
        defaultValue={currentVal}
        style={{ width: "80%" }}
        allowClear
        options={allActiveSprints}
        onChange={handleChange}
      />
    </>
  );
};
