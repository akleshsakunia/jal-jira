import React from "react";
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

interface NotFoundViewProps {}

export default () => {
  const navigate = useNavigate();
  return (
    <Result
      status="404"
      title="404"
      subTitle="Looks like this page got lost in the matrix !!"
      extra={
        <Button type="primary" onClick={() => navigate("/app/dashboard")}>
          Back Home
        </Button>
      }
    />
  );
};
