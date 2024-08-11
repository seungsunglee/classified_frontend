import axios from "axios"

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1`,
  xsrfHeaderName: "X-CSRFToken",
  xsrfCookieName: "csrftoken",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
})

export default api
