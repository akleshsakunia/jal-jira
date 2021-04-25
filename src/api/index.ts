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
  if(error.message === 'Network Error' &&  !error.response) 
    message.error('Please check network connection !!');
});

export default {
  login: (userData: any) =>
    instance({
      method: "POST",
      url: "/api-token-auth/",
      data: userData,
      headers: {},
    }),
  // getProfileData: (userId) =>
  //   instance({
  //     method: 'GET',
  //     url: `/users/${userId}/`
  //   }),
  // issues: {
  //   getIssuesAssignedToMe: (userId) =>
  //     instance({
  //       method: 'GET',
  //       url: `/assigned-issues/user/${userId}/`
  //     })
  // },
  // getMyTodos: (issueId) =>
  //   instance({
  //     method: 'GET',
  //     url: '/todos/'
  // })
};
