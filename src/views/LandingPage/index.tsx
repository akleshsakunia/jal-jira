import { Layout, Menu, Row, Col, Skeleton, Switch, Card, Avatar } from "antd";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import { useQuery } from "react-query";
import { UserInfo } from "../../layouts/AuthenticatedLayout";
import { useState, useEffect } from "react";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const { Meta } = Card;

export default () => {
  const userDetails: UserInfo = JSON.parse(localStorage.getItem("user_details")!);
  const [projectCount, setProjectCount] = useState([0]);
  const fetchProjects = async () => {
    const { data } = await api.projects.getMyProjects();
    return data;
  };
  const { isLoading, isSuccess, isError, data: userData } = useQuery(
    "project",
    fetchProjects,
    {refetchInterval: false}
  );
  useEffect(() => {
    async function fetchMyAPI() {
      const count = await userDetails.profile.tagged_projects;
      setProjectCount(count);
    }
  });

  const navigate = useNavigate();
  return (
    <>
      <h2>Your Work</h2>
      <Row>
        <h3> Recent Projects </h3>
        {projectCount}
        <Card style={{ width: 300, marginTop: 16 }} loading={isLoading}>
          <Meta
            avatar={<Avatar> al</Avatar>}
            title="Card title"
            description="This is the description"
          />
        </Card>
      </Row>
    </>
  );
};

// const User = () => {
//         const fetchUser = async () => {
//           const { data } = await api.issues.getIssuesAssignedToMe(5);
//           return data;
//         };
//         const {
//                  isLoading,
//                  isSuccess,
//                  isError,
//                  data: userData
//               } = useQuery("user", fetchUser);
//         return (
//           <div>
//             {isLoading && <article>...Loading user </article>}
//             {isError && <article>some error occured</article>}
//             {isSuccess && (
//               <article>
//                 <p>Username: {userData.username}</p>
//               </article>
//             )}
//           </div>
//         );
//       };
// export default User;
