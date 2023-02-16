import { List } from "antd";
import { useQuery } from "react-query";
import api from "../../../api";
import { storage } from "../../../firebase";
import { ref, getDownloadURL } from "firebase/storage";
import { Comment } from "@ant-design/compatible";
import AddComments from "./AddComments";
import Title from "antd/es/typography/Title";
import {
  Dispatch,
  forwardRef,
  SetStateAction,
  useContext,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { commentContext } from ".";

export default forwardRef(
  (
    {
      issueId,
    }: {
      issueId: number;
    },
    ref
  ) => {
    const [shouldTriggerUpdate, setShouldTriggerUpdate] =
      useContext(commentContext);
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
    } = useQuery(["getIssueComments", shouldTriggerUpdate], getIssueComments, {
      refetchInterval: false,
    });

    return (
      <>
        <Title level={5}>All Comments</Title>
        <List
          loading={isLoading}
          style={{ padding: "1rem", background: "#fff" }}
          className="comment-list"
          header={`${comments ? comments.length : 0} replies`}
          itemLayout="horizontal"
          dataSource={comments}
          renderItem={(item: any) => (
            <li>
              <Comment
                author={item.user_info.username}
                avatar={item.avatar_url}
                content={
                  <div dangerouslySetInnerHTML={{ __html: item.comment }} />
                }
                datetime={item.created_on}
              />
            </li>
          )}
        />
      </>
    );
  }
);
