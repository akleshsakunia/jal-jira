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
    <Layout style={{ height: "100vh" }}>
      <Navbar />
      <Layout>
        <Layout style={{ padding: "0 24px 24px" }}>
          {/* <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb> */}
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
      <Sidebar />
    </Layout>
  );
};
