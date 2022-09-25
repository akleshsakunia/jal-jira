import React, { ReactElement, useContext } from "react";
import { Avatar, List, Menu, Skeleton, Tag } from "antd";
import { FiBookmark, FiCheckCircle, FiList, FiZap } from "react-icons/fi";
import { useState } from "react";
import { useQuery } from "react-query";
import api from "../../api";
import { userContext, UserInfo } from "../../layouts/AuthenticatedLayout";
import style from "./index.module.scss";
import { useMediaQuery } from "react-responsive";
import { issueType, issueStatusColorCodes } from "../../utils/globalVars";
import { useNavigate } from "react-router-dom";

const LandingPageTabs = {
  workedOn: "workedOn",
  viewed: "viewed",
  assigned: "assigned",
  starred: "starred",
};

export default () => {
  const navigate = useNavigate();
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
        className={style.recentList}
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
                  <a onClick={() => navigate(`/app/issue/${item.id}`)}>
                    {item.issue_title}
                    <Tag
                      color={issueStatusColorCodes[item.issue_status]}
                      className="tags"
                    >
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
