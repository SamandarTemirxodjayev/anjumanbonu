import axios from "axios";

const API_URL = "http://80.78.254.116:3021/api/";
let accessToken = null;
let headers = {
  "Content-Type": "application/json",
};

if (typeof window !== "undefined") {
  accessToken = localStorage.getItem("token");
  let vcode = localStorage.getItem("sms_verfication");
  if(vcode == null){
    window.location.href = "/sms-verification";
  }
  headers = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };
}

export const $host = axios.create({
  baseURL: API_URL,
  headers: headers,
});

$host.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 401) {
      navigateTo("/logout");
      return;
    }
    return Promise.reject(error);
  },
);
