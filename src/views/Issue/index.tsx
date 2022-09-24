import React, { useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { useQuery } from "react-query";
import api from "../../api";
import { issueStatus } from "../../utils/globalVars";
import { useParams } from "react-router-dom";
import NotFoundView from "../NotFoundView";
import IssueSkeleton from "./IssueSkeleton";

export default () => {
  const { issueId } = useParams();
  const getIssue = async () => {
    let { data } = await api.issues.getIssue(+issueId);
    return data;
  };

  const {
    isLoading,
    isSuccess,
    isError,
    data: issueData,
  } = useQuery("getIssue", getIssue, { refetchInterval: false });

  return (
    <>
      {isLoading ? (
        <IssueSkeleton />
      ) : isSuccess ? (
        issueData.description
      ) : (
        <NotFoundView />
      )}
    </>
  );
};
