const BASE_URL = "http://localhost:8080";

const handleResponse = (response) => {
  if (!response.ok) {
    throw new Error(`Request failed with status: ${response.status}`);
  }
  return response.json();
};

const getAuthHeaders = () => {
  const authToken = localStorage.getItem("authToken");
  const headers = {
    "Content-Type": "application/json",
  };

  if (authToken) {
    headers.Authorization = `Bearer ${authToken}`;
  }

  return headers;
};

export const get = (endpoint) => {
  const url = `${BASE_URL}${endpoint}`;
  const headers = getAuthHeaders();

  return fetch(url, { headers }).then(handleResponse);
};

export const post = (endpoint, data) => {
  const url = `${BASE_URL}${endpoint}`;
  const headers = getAuthHeaders();

  const options = {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  return fetch(url, options).then(handleResponse);
};
