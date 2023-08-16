const API_URL = process.env.REACT_APP_API_URL;

const fetchApi = async ({ url = API_URL, method = "get", data = {} }) => {
  const fetchUrl = API_URL + url;
  const requestConfig = {
    body: JSON.stringify(data),
    method,
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
  };
  const res = await fetch(fetchUrl, method === "GET" ? {} : requestConfig);
  return res.json();
};

export default fetchApi;
