import React, { useState } from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import {
  AppstoreAddOutlined,
  BarcodeOutlined,
  ClusterOutlined,
  FileSearchOutlined,
  InboxOutlined,
  LaptopOutlined,
  NotificationOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

export default () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(true);

  return (
    <Sider
      width={200}
      className="site-layout-background"
      style={{ overflow: "scroll" }}
      collapsible
      collapsed={collapsed}
      onCollapse={(collapsed) => setCollapsed(collapsed)}
    >
      <Menu
        mode="inline"
        // defaultSelectedKeys={["3"]}
        // defaultOpenKeys={["sub1"]}
        style={{ height: "100%", borderRight: 0 }}
      >
        <Menu.Item key="1" icon={<ClusterOutlined />}>
          Roadmap
        </Menu.Item>
        <Menu.Item key="2" icon={<InboxOutlined />}>
          Backlog
        </Menu.Item>
        <Menu.Item key="3" icon={<BarcodeOutlined />}>
          Board
        </Menu.Item>
        <Menu.Item key="4" icon={<LaptopOutlined />}>
          Code Snippets
        </Menu.Item>
        <Menu.Item key="5" icon={<FileSearchOutlined />}>
          Project Pages
        </Menu.Item>
        <Menu.Item key="6" icon={<AppstoreAddOutlined />}>
          Add Items
        </Menu.Item>
        <Menu.Item key="7" icon={<SettingOutlined />}>
          Project Settings
        </Menu.Item>
      </Menu>
    </Sider>
  );
};
