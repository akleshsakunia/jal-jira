import { Select, Typography } from "antd";
import { values } from "lodash";
import { Dispatch, SetStateAction } from "react";
import { useQuery } from "react-query";
import api from "../../api";

export default ({
  selectedkey,
  setSelectedProject,
  bordered = false,
}: {
  selectedkey?: number | undefined;
  setSelectedProject: Dispatch<SetStateAction<number | undefined>>;
  bordered?: boolean;
}) => {
  const fetchProjects = async () => {
    const { data } = await api.projects.getMyProjects();
    const projectOptions = data.map((project: any) => ({
      value: project.id,
      label: project.project_title,
    }));

    return projectOptions;
  };
  const {
    isLoading,
    isSuccess,
    isError,
    data: projectOptions,
  } = useQuery("projectOptions", fetchProjects, { refetchInterval: false });
  return (
    <>
      {isSuccess && (
        <Select
          onChange={(projectKey) => setSelectedProject(projectKey)}
          defaultValue={selectedkey}
          style={{ width: 120 }}
          bordered={bordered}
          options={projectOptions}
        />
      )}
    </>
  );
};
