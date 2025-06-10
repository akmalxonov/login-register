import axios from "axios";

interface AxiosType {
  url: string;
  headers?: object;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  params?: object;
  body?: object;
}

export const useAxios = () => {
  const request = ({
    url,
    headers,
    method = "GET",
    params,
    body,
  }: AxiosType) => {
    const token = localStorage.getItem("access_token");
    return axios({
      url: `${import.meta.env.VITE_BASE_URL}/${url}`,
      method,
      data: body,
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...headers,
      },
      params: {
        access_token: "64eecf3b54abde61153d1fd3", 
        ...params,
      },
    })
      .then((res) => res.data)
      .catch((error) => {
        console.error("Axios error:", error.response?.data || error);
        throw error;
      });
  };

  return request;
};
