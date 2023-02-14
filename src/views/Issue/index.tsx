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
import IssueDescription from "./IssueDescription";
import Comments from "./Comments";
import IssueSider from "./IssueSider";

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
          <Col span={24}>
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
            <Row>
              <Col span={18}>
                <Row>
                  <Col span={24}>
                    <IssueDescription
                      issueId={+issueId}
                      initialVal={issueData.description}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <Comments issueId={+issueId} />
                  </Col>
                </Row>
              </Col>
              <Col span={6}>
                <Row style={{ padding: "0rem 1rem" }}>
                  <IssueSider issueData={issueData} />
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      ) : (
        <NotFoundView />
      )}
    </>
  );
};
