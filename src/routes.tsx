import React from "react";
import { Navigate } from "react-router-dom";
import AuthenticatedLayout from "./layouts/AuthenticatedLayout";
import UnauthenticatedLayout from "./layouts/UnauthenticatedLayout";
import SignIn from "./views/auth/SignIn";
import SignUp from "./views/auth/SignUp";
import LandingPage from "./views/LandingPage";
import NotFoundView from "./views/NotFoundView";
import Analytics from "./views/Analytics";
import Board from "./views/Board";
import Issue from "./views/Issue";

const routes = (isLoggedIn: boolean) => [
  {
    path: "app/",
    element: isLoggedIn ? <AuthenticatedLayout /> : <Navigate to="/signin" />,
    children: [
      { path: "dashboard", element: <LandingPage /> },
      { path: "board", element: <Board /> },
      { path: "issue/:issueId", element: <Issue /> },
      { path: "404", element: <NotFoundView /> },
      { path: "*", element: <Navigate to="/404" /> },
    ],
  },
  {
    path: "/",
    element: !isLoggedIn ? (
      <UnauthenticatedLayout />
    ) : (
      <Navigate to="/app/dashboard" />
    ),
    children: [
      { path: "signin", element: <SignIn /> },
      { path: "signup", element: <SignUp /> },
      { path: "404", element: <NotFoundView /> },
      { path: "/", element: <Navigate to="/app/dashboard" /> },
      { path: "*", element: <Navigate to="/404" /> },
    ],
  },
];

export default routes;
