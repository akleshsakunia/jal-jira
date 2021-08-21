import React from "react";
import { Menu, Button, Input, Avatar } from "antd";
import "./index.scss";
const { Search } = Input;

export default () => {
  return (
    <Menu theme="light" mode="horizontal" className="menu-right nav">
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
  );
};
