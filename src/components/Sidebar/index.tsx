import React from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

export default () => {
    const navigate = useNavigate();
  return (
    <Sider
      width={200}
      className="site-layout-background"
      style={{ overflow: "scroll" }}
    >
      <Menu
        mode="inline"
        // defaultSelectedKeys={["3"]}
        // defaultOpenKeys={["sub1"]}
        style={{ height: "100%", borderRight: 0 }}
      >
        <Menu.Item key="1" icon={<LaptopOutlined />}>
          Roadmap
        </Menu.Item>
        <Menu.Item key="2" icon={<LaptopOutlined />}>
          Backlog
        </Menu.Item>
        <Menu.Item key="3" icon={<LaptopOutlined />}>
          Board
        </Menu.Item>
        <Menu.Item key="4" icon={<LaptopOutlined />}>
          Code
        </Menu.Item>
        <Menu.Item key="5" icon={<LaptopOutlined />}>
          Project Pages
        </Menu.Item>
        <Menu.Item key="6" icon={<LaptopOutlined />}>
          Add Items
        </Menu.Item>
        <Menu.Item key="7" icon={<LaptopOutlined />}>
          Project Settings
        </Menu.Item>
      </Menu>
    </Sider>
  );
};
