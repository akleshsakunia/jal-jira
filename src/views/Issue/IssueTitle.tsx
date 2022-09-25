import React, { useEffect, useState } from "react";

import api from "../../api";

import { Typography } from "antd";

import { FcDownLeft } from "react-icons/fc";

const { Paragraph, Title } = Typography;

export default ({
  title,
  issueId,
}: {
  title: string;
  issueId: number;
}): JSX.Element => {
  const [issueTitle, setIssueTitle] = useState(String);
  const updateIssue = async (issueTitle: string) => {
    const reqData = { issue_title: issueTitle };
    const res = await api.issues.updateIssue(+issueId, reqData);
    setIssueTitle(issueTitle);
  };
  useEffect(() => {
    setIssueTitle(title);
  }, [title]);

  return (
    <>
      {issueTitle && (
        <Title
          level={3}
          editable={{
            icon: <FcDownLeft />,
            tooltip: "click to edit text",
            onChange: updateIssue,
            maxLength: 125,
          }}
        >
          {issueTitle}
        </Title>
      )}
    </>
  );
};
