import React from "react";
import { Select, Typography } from "antd";
import api from "../../../api";
import { useQuery } from "react-query";

export const ReporterInput = ({
  handleUpdate,
  currentVal,
  allProjectUsers,
}: {
  handleUpdate: (key: string, value: any) => void;
  currentVal: string;
  allProjectUsers: any;
}) => {
  const handleChange = (value: string) => {
    handleUpdate("reporter", value || null);
  };
  return (
    <>
      <Typography.Title level={5} style={{ margin: 0 }}>
        Reporter
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
