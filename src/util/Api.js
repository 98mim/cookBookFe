import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "http://localhost:3000",
  },
  withCredentials: true,
});
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    //const originalRequest = error.config;

    if (error.response.status === 403 /*&& !originalRequest._retry*/) {
      console.log(error.response.status);
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      /*originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refresh_token");
        const response = await axios.post(
          "http://localhost:8080/refresh-token",
          {},
          {
            headers: {
              Authorization: `${refreshToken}`,
            },
          },
        );
        //todo check if works
        console.log(response);
        const newAccessToken = response.data.access_token;
        localStorage.setItem("access_token", newAccessToken);

        // Update the authorization header and retry the original request
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (err) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        // todo redirect window.location.href = "/login";
        return Promise.reject(err);
      }*/
    }

    return Promise.reject(error);
  },
);

const request = {
  get: (url, config) => {
    return api.get(url, config);
  },
  post: (url, data, config) => {
    return api.post(url, data, config);
  },
  put: (url, data, config) => {
    return api.put(url, data, config);
  },
  delete: (url, config) => {
    return api.delete(url, config);
  },
};

export default request;
