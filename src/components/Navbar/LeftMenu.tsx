import React, { Component } from "react";
import { Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
import "./index.scss";
export const YourWorkMenuItems = (
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
    <Menu
      theme="light"
      mode="horizontal"
      className="nav"
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
  );
};
