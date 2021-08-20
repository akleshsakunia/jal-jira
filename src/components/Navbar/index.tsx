import { Layout, Menu, Dropdown, Button, Input, Avatar } from "antd";
import { DownOutlined } from "@ant-design/icons";
import React from "react";

const { Header } = Layout;
const { Search } = Input;

const YourWorkMenuItems = (
  <Menu>
    <Menu.Item>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.antgroup.com"
      >
        1st menu item
      </a>
    </Menu.Item>
  </Menu>
);
export default () => {
  return (
    <Header className="header" style={{ backgroundColor: "#272727" }}>
      {/* <div className="logo" /> */}
      <Menu
        theme="light"
        mode="horizontal"
        style={{ backgroundColor: "#FFE400" }}
        defaultSelectedKeys={["1"]}

      >
        <Menu.Item key="1">
          <Dropdown overlay={YourWorkMenuItems} placement="bottomCenter" arrow>
            <a className="ant-dropdown-link">
              Your work <DownOutlined />
            </a>
          </Dropdown>
        </Menu.Item>
        <Menu.Item key="2">
          <Dropdown overlay={YourWorkMenuItems} placement="bottomCenter" arrow>
            <a className="ant-dropdown-link">
              Projects <DownOutlined />
            </a>
          </Dropdown>
        </Menu.Item>
        <Menu.Item key="3">
          <Dropdown overlay={YourWorkMenuItems} placement="bottomCenter" arrow>
            <a className="ant-dropdown-link">
              More <DownOutlined />
            </a>
          </Dropdown>
        </Menu.Item>
      </Menu>
      <Menu
        theme="light"
        mode="horizontal"
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          backgroundColor: "#FFE400",
        }}
      >
        <Menu.Item key="1">
          <Button> Create</Button>
        </Menu.Item>
        <Menu.Item key="2">
          <Search
            placeholder="input search text"
            enterButton={false}
            style={{ verticalAlign: "middle" }}
          />
        </Menu.Item>
        <Menu.Item>
          <Avatar style={{ color: "#f56a00", backgroundColor: "#fde3cf" }}>
            U
          </Avatar>
        </Menu.Item>
      </Menu>
    </Header>
  );
};
