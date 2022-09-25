import React, { useState } from "react";
import { useQuery } from "react-query";
import api from "../../api";
import { useParams } from "react-router-dom";
import NotFoundView from "../NotFoundView";
import { Row, Col, Typography, Tag } from "antd";
import IssueTitle from "./IssueTitle";
import IssueSkeleton from "./IssueSkeleton";
import { issueType } from "../../utils/globalVars";
import IssueActions from "./IssueActions";

const { Paragraph, Title } = Typography;

export default () => {
  const { issueId } = useParams();
  const getIssue = async () => {
    let { data } = await api.issues.getIssue(+issueId);
    return data;
  };

  const {
    isLoading,
    isSuccess,
    isError,
    data: issueData,
  } = useQuery("getIssue", getIssue, { refetchInterval: false });

  return (
    <>
      {isLoading ? (
        <IssueSkeleton />
      ) : isSuccess ? (
        <Row>
          <Col span={16}>
            <Row>
              <Col span={24}>
                <Row>
                  <Col span={24}>
                    <Paragraph>
                      <Tag icon={issueType[issueData.issue_type]}>
                        {issueData.uid}
                      </Tag>
                    </Paragraph>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <IssueTitle
                      title={issueData.issue_title}
                      issueId={+issueId}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <IssueActions />
            </Row>
            {/*<Row>
              <IssueDescription />
            </Row>
            <Row>
              <IssueActivity />
            </Row> */}
          </Col>

          {/* <Col>
            <Row>
              <IssueSideBar />
            </Row>
          </Col> */}
        </Row>
      ) : (
        <NotFoundView />
      )}
    </>
  );
};
