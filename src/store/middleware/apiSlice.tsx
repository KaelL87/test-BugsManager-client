import { BaseQueryApi } from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import {
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { callErrorToast } from "src/helpers/toast";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://server-test1.onrender.com",
  prepareHeaders: (headers) => {
    return headers;
  },
});

const baseQueryWithReauth = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: {}
) => {
  let result = (await baseQuery(args, api, extraOptions)) as any;
  if (result.error) {
    callErrorToast(result.error.message);
    console.log(result.error.message);
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (_builder) => ({}),
});
