import React, { useContext } from "react";
import { Avatar, List, Menu, Skeleton, Tag } from "antd";
import {
  FiBookmark,
  FiCheckCircle,
  FiList,
  FiXOctagon,
  FiZap,
} from "react-icons/fi";
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
  AimOutlined,
  CrownOutlined,
  FireOutlined,
  FormatPainterOutlined,
} from "@ant-design/icons";
import { Empty } from "antd";
import { useState } from "react";
import { useQuery } from "react-query";
import api from "../../api";
import { userContext, UserInfo } from "../../layouts/AuthenticatedLayout";
import list from "antd/lib/transfer/list";

const colorCodes: any = {
  IN_PROG: "cyan",
  DONE: "green",
  TESTING: "magenta",
  TESTED: "gold",
  BLOCKED: "red",
  TODO: "purple",
};

const issueType: any = {
  TASK: <FiList />,
  STORY: <FiBookmark />,
  BUG: <FiXOctagon />,
  EPIC: <FiZap />,
};

export default () => {
  const [current, setCurrent] = useState("workedOn");
  const userDetails: any = useContext(userContext);

  const handleClick = (e: any) => {
    setCurrent(e.key);
  };

  const fetchAllMyIssues = async () => {
    const user_id = userDetails.id;
    const { data } = await api.issues.getAllMyIssues(user_id);
    return data;
  };
  const {
    isLoading,
    isSuccess,
    isError,
    data: allMyIssues,
  } = useQuery("getAllMyIssues", fetchAllMyIssues, { refetchInterval: false });

  return (
    <>
      <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
        <Menu.Item key="workedOn" icon={<MailOutlined />}>
          Worked On
        </Menu.Item>
        <Menu.Item key="viewed" icon={<MailOutlined />}>
          Viewed
        </Menu.Item>
        <Menu.Item key="assigned" icon={<MailOutlined />}>
          Assigned to me
        </Menu.Item>
        <Menu.Item key="starred" icon={<MailOutlined />}>
          Starred
        </Menu.Item>
      </Menu>
      <List
        loading={isLoading}
        itemLayout="horizontal"
        dataSource={allMyIssues}
        renderItem={(item: any) => (
          <List.Item
            actions={[
              <a key="list-loadmore-edit">edit</a>,
              <a key="list-loadmore-more">more</a>,
            ]}
          >
            <Skeleton avatar title={false} loading={isLoading} active>
              <List.Item.Meta
                avatar={issueType[item.issue_type]}
                title={
                  <a href="https://ant.design">
                    {item.issue_title}{" "}
                    <Tag
                      color={colorCodes[item.issue_status]}
                      style={{ borderRadius: "2rem", marginLeft: "0.8rem" }}
                    >
                      {item.issue_status}
                    </Tag>
                  </a>
                }
                description={`Issue Id: ${item.uid}`}
              />
              <div>content</div>
            </Skeleton>
          </List.Item>
        )}
      />
      {/* <Empty /> */}
    </>
  );
};
