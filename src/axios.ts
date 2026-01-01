import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.baseURL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/v1";
