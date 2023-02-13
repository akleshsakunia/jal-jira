import React from "react";
import { Outlet } from "react-router-dom";
import { Layout, Menu, Breadcrumb } from "antd";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import api from "../../api";
import { useQuery } from "react-query";
import { isNullishCoalesce } from "typescript";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

export interface UserInfo {
  user_id: number;
  email: string;
  user_details: {
    profile: {
      tagged_projects: Array<number>;
    };
  };
  [key: string]: any;
}

export const userContext = React.createContext({});

export default ({}) => {
  const userInfo: UserInfo = JSON.parse(localStorage.getItem("userInfo")!);

  const fetchUserDetails = async () => {
    const { data } = await api.getProfileData(userInfo.user_id);
    localStorage.setItem("user_details", JSON.stringify(data));
    return data;
  };
  const {
    isLoading,
    isSuccess,
    isError,
    data: userData,
  } = useQuery("userdetails", fetchUserDetails, { refetchInterval: false });

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {isSuccess && (
        <userContext.Provider value={userData}>
          <Navbar />
          <Layout>
            <Layout style={{ padding: "1rem" }}>
              {/* <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb> */}
              <Content>
                <Outlet />
              </Content>
            </Layout>
          </Layout>
          <Sidebar />
        </userContext.Provider>
      )}
    </Layout>
  );
};
