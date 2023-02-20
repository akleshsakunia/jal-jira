import { Select, Typography } from "antd";
import { ESTIMATE } from "../../../utils/globalVars";

export const EstimateInput = ({
  handleUpdate,
  currentVal,
}: {
  handleUpdate: (key: string, value: any) => void;
  currentVal: string;
}) => {
  const handleChange = (value: string) => {
    handleUpdate("estimate", value || null);
  };
  return (
    <>
      <Typography.Title level={5} style={{ margin: 0 }}>
        Estimate
      </Typography.Title>
      <Select
        defaultValue={currentVal}
        style={{ width: "80%" }}
        allowClear
        options={ESTIMATE}
        onChange={handleChange}
      />
    </>
  );
};
