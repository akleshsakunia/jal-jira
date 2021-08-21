import { Layout, Menu, Row, Col, Skeleton, Switch, Card, Avatar } from "antd";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import { useQuery } from "react-query";
import { useState, useEffect, Suspense } from "react";
import RecentProjectCards from "./RecentProjectCards";
import RecentWorks from "./RecentWorks";
export default () => {
  const navigate = useNavigate();
  return (
    <>
      <h2>Your Work</h2>
      <h3> Recent Projects </h3>
      <RecentProjectCards />
      <RecentWorks />
    </>
  );
};
