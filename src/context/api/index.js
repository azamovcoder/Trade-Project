import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";

// import { logout } from '../slices/authSlice';

const baseQuery = async (args, api, extraOptions) => {
  const { dispatch } = api;
  const rawBaseQuery = fetchBaseQuery({
    baseUrl: "https://trade.namtech.uz",
    prepareHeaders: (headers) => {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Njk1ZWUyZDU2NjU3NzU2YzQ3OTcwNjYiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MjExMDI0ODV9.SxcKhygvvPdwAfhrj3Z0Bh4p0gNJXPa55GW9s8lJNco"; //localStorage.getItem("x-auth-token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  });

  const result = await rawBaseQuery(args, api, extraOptions);

  if (result.error) {
    const { status } = result.error;
    if (status === 401 || status === 403) {
      console.error("Unauthorized access - Redirecting to login...");
      // dispatch(logout())
    }
  }
  return result;
};
const baseQueryWithRetry = retry(baseQuery, { maxRetries: 0 });

export const api = createApi({
  reducerPath: "myApi",
  baseQuery: baseQueryWithRetry,
  tagTypes: ["User", "Product", "Category", "Seller"],
  endpoints: () => ({}),
});
