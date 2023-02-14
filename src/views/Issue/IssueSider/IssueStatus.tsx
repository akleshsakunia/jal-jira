import { Select, Typography } from "antd";

const ISSUE_STATUS = [
  { label: "INPROGRESS", value: "IN_PROG" },
  { label: "DONE", value: "DONE" },
  { label: "TESTING", value: "TESTING" },
  { label: "TESTED", value: "TESTED" },
  { label: "BLOCKED", value: "BLOCKED" },
  { label: "TODO", value: "TODO" },
];

export const IssueStatusInput = ({
  handleUpdate,
  currentVal,
}: {
  handleUpdate: (key: string, value: any) => void;
  currentVal: string;
}) => {
  const handleChange = (value: string) => {
    handleUpdate("issue_status", value || null);
  };
  return (
    <>
      <Typography.Title level={5} style={{ margin: 0 }}>
        Issue Status
      </Typography.Title>
      <Select
        defaultValue={currentVal}
        style={{ width: "80%" }}
        allowClear
        options={ISSUE_STATUS}
        onChange={handleChange}
      />
    </>
  );
};
