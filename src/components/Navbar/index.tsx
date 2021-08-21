import { Layout } from "antd";
import React from "react";
import LeftMenu from "./LeftMenu";
import RightMenu from "./RightMenu";

const { Header } = Layout;

export default () => {
  return (
    <Header className="header">
      <LeftMenu />
      <RightMenu />
    </Header>
  );
};
