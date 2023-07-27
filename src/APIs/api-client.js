import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_URI,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    let res = error.response;
    console.log(`Something went wrong. Status code: ${res?.status}`);
    return Promise.reject(error);
  }
);

// Function for GET request
export async function getData(endpoint, params) {
  try {
    const response = await axiosClient.get(endpoint, {
      params: params,
      paramsSerializer: {
        indexes: null, // by default: false
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Function for POST request
export const postData = async (endpoint, data, params) => {
  const config = {
    params: params,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: false,
  };
  try {
    const response = await axiosClient.post(endpoint, data, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};
