import { List } from "antd";
import { useQuery } from "react-query";
import api from "../../../api";
import { storage } from "../../../firebase";
import { ref, getDownloadURL } from "firebase/storage";
import { Comment } from "@ant-design/compatible";

export default ({ issueId }: { issueId: number }) => {
  const getIssueComments = async () => {
    let { data } = await api.issues.getComments(+issueId);
    // const ImageURL = await getDownloadURL(
    //   ref(storage, "gs://jal-jira-ccec2.appspot.com/avatar.jpeg")
    // );
    data.forEach(
      (comment: any) =>
        (comment[
          "avatar_url"
        ] = `https://i.pravatar.cc/50?img=${comment.user_info.id}`)
    );
    return data;
  };

  const {
    isLoading,
    isSuccess,
    isError,
    data: comments,
  } = useQuery("getIssueComments", getIssueComments, {
    refetchInterval: false,
  });
  return isLoading ? (
    <>no Comments</>
  ) : (
    <List
      style={{ padding: "1rem", background: "#fff" }}
      className="comment-list"
      header={`${comments.length} replies`}
      itemLayout="horizontal"
      dataSource={comments}
      renderItem={(item: any) => (
        <li>
          <Comment
            // actions={item.actions}
            author={item.user_info.username}
            avatar={item.avatar_url}
            content={item.comment}
            datetime={item.created_on}
          />
        </li>
      )}
    />
  );
};
