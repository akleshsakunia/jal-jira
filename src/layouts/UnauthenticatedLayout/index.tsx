import React from "react";
import { Outlet } from "react-router-dom";

interface indexProps {}

export default ({}) => {
  return (
    <>
      unauth works
      <Outlet />
    </>
  );
};
