import { useEffect, useState } from "react";
import { Layout, Menu, Breadcrumb, MenuProps, Avatar } from "antd";
import {
  AppstoreAddOutlined,
  AppstoreOutlined,
  BarcodeOutlined,
  ClusterOutlined,
  FileSearchOutlined,
  InboxOutlined,
  LaptopOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import * as _ from "lodash";
import AddProject from "../../views/AddItems/AddProject";
import AddSprint from "../../views/AddItems/AddSprint";
import AddIssue from "../../views/AddItems/AddIssue";

type MenuItem = Required<MenuProps>["items"][number];
const MENU_ITEM_SLUG = {
  roadmap: "/app/roadmap",
  backlog: "/app/backlog",
  board: "/app/board",
  codeSnippets: "/app/code-snippets",
  addIssue: "/app/add-issues",
  addProject: "/app/add-project",
  addSprint: "/app/add-sprint",
  projectSettings: "/app/project-settings",
};
const MENU_ITEM_SLUG_MAP = { ...MENU_ITEM_SLUG, ..._.invert(MENU_ITEM_SLUG) };
const { Sider } = Layout;

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Roadmap", "roadmap", <ClusterOutlined />),
  getItem("Backlog", "backlog", <InboxOutlined />),
  getItem("Board", "board", <BarcodeOutlined />),
  getItem("Code Snippets", "codeSnippets", <LaptopOutlined />),
  getItem("Project Pages", "projectPages", <FileSearchOutlined />),
  getItem("Add Items", "addItems", <AppstoreAddOutlined />, [
    getItem("Add Issue", "addIssue"),
    getItem("Add Project", "addProject"),
    getItem("Add Sprint", "addSprint"),
  ]),
  getItem("Project Settings", "projectSettings", <SettingOutlined />),
];

export default () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(true);
  const [selectedKeys, setSelectedKeys] = useState<string>();
  const [openModalKey, setOpenModalKey] = useState<string>();

  const [open, setOpen] = useState(true);

  const onClick: MenuProps["onClick"] = (evt: { key: string }) => {
    if (["addIssue", "addProject", "addSprint"].includes(evt.key)) {
      setOpenModalKey(evt.key);
      setOpen(true);
    } else
      navigate(MENU_ITEM_SLUG_MAP[evt.key as keyof typeof MENU_ITEM_SLUG_MAP]);
  };

  useEffect(() => {
    setSelectedKeys(
      MENU_ITEM_SLUG_MAP[location.pathname as keyof typeof MENU_ITEM_SLUG_MAP]
    );
  }, [onClick]);

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(collapsed) => setCollapsed(collapsed)}
      reverseArrow={true}
    >
      <div
        style={{
          height: 32,
          margin: 16,
          justifyContent: "center",
          display: "flex",
          cursor: "pointer",
        }}
        onClick={() => navigate("/app/dashboard")}
      >
        <Avatar src={process.env.PUBLIC_URL + "/apple-touch-icon.png"} />
      </div>
      <Menu
        selectedKeys={selectedKeys ? [selectedKeys] : []}
        onClick={onClick}
        mode="inline"
        items={items}
        theme="dark"
      />
      <AddProject
        open={open && openModalKey === "addProject"}
        setOpen={setOpen}
      />
      <AddSprint
        open={open && openModalKey === "addSprint"}
        setOpen={setOpen}
      />
      <AddIssue open={open && openModalKey === "addIssue"} setOpen={setOpen} />
    </Sider>
  );
};
