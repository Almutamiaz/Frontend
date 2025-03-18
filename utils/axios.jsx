import axios from "axios";

// const full = `${request}//${host}`;
// const request = window.location.protocol;
// const host = window.location.host;
// const fullUrl = window.location.href;
// console.log(request);
// console.log(host);
// console.log(fullUrl);

// Get the pathname from the URL (e.g., "/ar/Account/SignUp")
const pathName = window.location.pathname;

// Split the pathname into segments and filter out any empty strings
const segments = pathName.split("/").filter((segment) => segment.length > 0);

// Check if the first segment is "ar" or "en". Default to "ar" if not.
const locale =
  segments[0] === "ar" || segments[0] === "en" ? segments[0] : "ar";

// console.log(locale); // Outputs "ar" for http://localhost:3000/ar/Account/SignUp

const axiosInstance = axios.create({
  baseURL: "/backend/api",
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("token") || "",
    "X-localization": locale,
  },
});
axiosInstance.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");
  config.headers.Authorization = "Bearer " + token;
  return config;
});

//  console.log(document.querySelector('meta[name="csrf-token"]')?.getAttribute('content'))

// axiosInstance.defaults.withCredentials = true;

export default axiosInstance;
