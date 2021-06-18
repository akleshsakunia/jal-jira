import { Layout, Menu, Breadcrumb } from "antd";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

export default () => {
  return (
    <Layout style={{ height: "100vh" }}>
      <Navbar/>
      <Layout>
        <Sidebar/>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            Content
          </Content>
        </Layout>
      </Layout>
    </Layout>
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
