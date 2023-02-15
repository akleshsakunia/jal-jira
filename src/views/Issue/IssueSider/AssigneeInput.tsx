import { Select, Typography } from "antd";

export const AssigneeInput = ({
  handleUpdate,
  currentVal,
  allProjectUsers,
}: {
  handleUpdate: (key: string, value: any) => void;
  currentVal: string;
  allProjectUsers: any;
}) => {
  const handleChange = (value: string) => {
    handleUpdate("assignee", value || null);
  };
  return (
    <>
      <Typography.Title level={5} style={{ margin: 0 }}>
        Assignee
      </Typography.Title>
      <Select
        defaultValue={currentVal}
        style={{ width: "80%" }}
        allowClear
        options={allProjectUsers}
        onChange={handleChange}
      />
    </>
  );
};
