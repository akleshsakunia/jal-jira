import { Select, Typography } from "antd";

const PRIORITY = [
  { label: "HIGH", value: "HIGH" },
  { label: "MEDIUM", value: "MEDIUM" },
  { label: "LOW", value: "LOW" },
];

export const PriorityInput = ({
  handleUpdate,
  currentVal,
}: {
  handleUpdate: (key: string, value: any) => void;
  currentVal: string;
}) => {
  const handleChange = (value: string) => {
    handleUpdate("priority", value || null);
  };
  return (
    <>
      <Typography.Title level={5} style={{ margin: 0 }}>
        Priority
      </Typography.Title>
      <Select
        defaultValue={currentVal}
        style={{ width: "80%" }}
        allowClear
        options={PRIORITY}
        onChange={handleChange}
      />
    </>
  );
};
