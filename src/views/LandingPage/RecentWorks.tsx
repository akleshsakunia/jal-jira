import React, { ReactElement, useContext } from "react";
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
import "./index.scss";
import { useMediaQuery } from "react-responsive";

const colorCodes: any = {
  IN_PROG: "cyan",
  DONE: "green",
  TESTING: "magenta",
  TESTED: "gold",
  BLOCKED: "red",
  TODO: "purple",
};

const LandingPageTabs = {
  workedOn: "workedOn",
  viewed: "viewed",
  assigned: "assigned",
  starred: "starred",
};
export const issueType: any = {
  TASK: <img src="/icons/Task.svg" alt="task" />,
  STORY: <img src="/icons/Story.svg" alt="story" />,
  BUG: <img src="/icons/Bug.svg" alt="bug" />,
  EPIC: <img src="/icons/Epic.svg" alt="epic" />,
};

export default () => {
  const [currentTab, setCurrentTab] = useState(LandingPageTabs.workedOn);
  const userDetails: any = useContext(userContext);
  const mode = useMediaQuery({ maxWidth: 1224 }) ? "vertical" : "horizontal";

  const handleClick = (e: any) => {
    setCurrentTab(e.key);
    // refreshContentOnTabs();
    console.log(e.key);
  };

  const fetchData = async () => {
    const user_id = userDetails.id;
    let data = [];
    if (currentTab == LandingPageTabs.workedOn) {
      ({ data } = await api.issues.getAllMyIssues(user_id));
    } else if (currentTab == LandingPageTabs.assigned) {
      ({ data } = await api.issues.getIssuesAssignedToMe(user_id));
    }
    return data;
  };
  const {
    isLoading,
    isSuccess,
    isError,
    data: allMyIssues,
    refetch: refreshContentOnTabs,
  } = useQuery(["landingPagetabs", currentTab], fetchData, {
    refetchInterval: false,
  });

  return (
    <div>
      <Menu
        onClick={(e) => handleClick(e)}
        selectedKeys={[currentTab]}
        mode={mode}
      >
        <Menu.Item key={LandingPageTabs.workedOn} icon={<FiBookmark />}>
          Worked On
        </Menu.Item>
        <Menu.Item key={LandingPageTabs.viewed} icon={<FiList />}>
          Viewed
        </Menu.Item>
        <Menu.Item key={LandingPageTabs.assigned} icon={<FiCheckCircle />}>
          Assigned to me
        </Menu.Item>
        <Menu.Item key={LandingPageTabs.starred} icon={<FiZap />}>
          Starred
        </Menu.Item>
      </Menu>
      <List
        className="recent-list"
        loading={isLoading}
        itemLayout="horizontal"
        dataSource={allMyIssues}
        renderItem={(item: any) => (
          <List.Item
            actions={[
              // <a key="list-loadmore-edit">edit</a>,
              // <a key="list-loadmore-more">more</a>,
              <span>Priority: {item.priority}</span>,
            ]}
          >
            <Skeleton avatar title={false} loading={isLoading} active>
              <List.Item.Meta
                avatar={issueType[item.issue_type]}
                title={
                  <a href="https://ant.design">
                    {item.issue_title}
                    <Tag color={colorCodes[item.issue_status]} className="tags">
                      {item.issue_status}
                    </Tag>
                  </a>
                }
                description={`Issue Id: ${item.uid}`}
              />
              <div>{item.description}</div>
            </Skeleton>
          </List.Item>
        )}
      />
    </div>
  );
};
