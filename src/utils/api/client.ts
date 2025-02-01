import axios from "axios";

const apiClient = axios.create({
  baseURL: "/api",
});

const apiClientStaging = axios.create({
  baseURL: import.meta.env.STAGING_API_URL,
});

const apiClientProduction = axios.create({
  baseURL: import.meta.env.PRODUCTION_API_URL,
});

export { apiClient, apiClientStaging, apiClientProduction };

export default apiClient;
