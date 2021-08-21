import React from "react";
import "./App.scss";
import { useRoutes, BrowserRouter as Router } from "react-router-dom";
import "antd/dist/antd.css";
import routes from "./routes";
import auth from "./utils/auth";
import { QueryClient, QueryClientProvider } from "react-query";
import { UserInfo } from "./layouts/AuthenticatedLayout";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
function App() {
  const routing = useRoutes(routes(auth.isAuthenticated()));

  return (
    <QueryClientProvider client={queryClient}>{routing}</QueryClientProvider>
  );
}

export default App;
