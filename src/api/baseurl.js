export const BASE_URL = "http://127.0.0.1:8000"

export const TOCKEN_ONLY = () => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: token ? `Token ${token}` : "",
    },
  };
};