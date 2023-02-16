import axios from "axios";
import { message } from "antd";

// Create instance called instance
const instance = axios.create({
  baseURL: `http://localhost:8000/api/v1`,
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = `JWT ${localStorage.getItem("token")}`;
  return config;
});

instance.interceptors.response.use(undefined, (error) => {
  if (error.message === "Network Error" && !error.response) {
    message.error("Please check network connection !!");
    return;
  }
  if (error.response.status === 401) {
    message.error({
      content: `<>Your session is expired. Please <Link href='/signin'>sign in</Link> again to continue.</>`,
    });
  }
  return Promise.reject(error);
});

export default {
  login: (userData: any) =>
    instance({
      method: "POST",
      url: "/api-token-auth/",
      data: userData,
      headers: {},
    }),
  getProfileData: (userId: number) =>
    instance({
      method: "GET",
      url: `/users/${userId}/`,
    }),
  issues: {
    getIssuesAssignedToMe: (userId: number) =>
      instance({
        method: "GET",
        url: `/assigned-issues/user/${userId}/`,
      }),
    getAllMyIssues: (userId: number) =>
      instance({
        method: "GET",
        url: `/all-my-issues/user/${userId}/`,
      }),
    updateIssue: (issueId: number, data: object) =>
      instance({
        method: "PATCH",
        url: `/issues/${issueId}/`,
        data: data,
      }),
    getIssue: (issueId: number) =>
      instance({
        method: "GET",
        url: `/issues/${issueId}/`,
      }),
    getComments: (issueId: number) =>
      instance({
        method: "GET",
        url: `${issueId}/comments/`,
      }),
    postComments: (data: object) =>
      instance({
        method: "POST",
        url: `/comments/`,
        data: data,
      }),
  },
  projects: {
    getMyProjects: () =>
      instance({
        method: "GET",
        url: `get-my-projects/`,
      }),
    getAllProjectUsers: (projectId: number) =>
      instance({
        method: "GET",
        url: `project/${projectId}/users/`,
      }),
    getAllProjectSprints: (projectId: number) =>
      instance({
        method: "GET",
        url: `project/${projectId}/sprints/`,
      }),
  },
  sprint: {
    board: () =>
      instance({
        method: "GET",
        url: `board/`,
      }),
  },

  // getMyTodos: (issueId) =>
  //   instance({
  //     method: 'GET',
  //     url: '/todos/'
  // })
};
