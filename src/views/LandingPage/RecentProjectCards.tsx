import { Layout, Menu, Row, Col, Skeleton, Switch, Card, Avatar } from "antd";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import { useQuery } from "react-query";
import { useState, useEffect, Suspense } from "react";
import { UserInfo } from "../../layouts/AuthenticatedLayout";

const { Meta } = Card;

export default () => {
  const fetchProjects = async () => {
    const { data } = await api.projects.getMyProjects();
    return data;
  };
  const {
    isLoading,
    isSuccess,
    isError,
    data: projectData,
  } = useQuery("project", fetchProjects, { refetchInterval: false });
  return (
    <Row gutter={16}>
      {isSuccess ? (
        projectData.map((x: any) => (
          <Col key={x.id} style={{ padding: "0.5em" }}>
            <Card>
              <Meta
                avatar={
                  <Avatar
                    style={{
                      backgroundColor: "#1d1d0e",
                      verticalAlign: "middle",
                    }}
                  >
                    {x.abbr}
                  </Avatar>
                }
                title={x.project_title}
                description={x.short_description}
              />
            </Card>
          </Col>
        ))
      ) : (
        <Card style={{ width: 300 }} loading={true}>
          <Meta avatar={<Avatar> al</Avatar>} title="" description="" />
        </Card>
      )}
    </Row>
  );
};
