import React from "react";
import "./App.css";
import { useRoutes, BrowserRouter as Router } from "react-router-dom";
import "antd/dist/antd.css";
import routes from "./routes";
import auth from "./utils/auth";

function App() {
  const routing = useRoutes(routes(auth.isAuthenticated()));

  return <>{routing}</>;
}

export default App;
