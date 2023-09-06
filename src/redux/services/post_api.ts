import { IPost } from "@/interfaces";
import { createApi } from "@reduxjs/toolkit/query/react";
import axios, { AxiosRequestConfig, AxiosError } from "axios";

const axiosBaseQuery =
  ({ baseUrl }: { baseUrl: string }) =>
  async ({ url, method, data }: AxiosRequestConfig) => {
    try {
      const response = await axios({ url: baseUrl + url, method, data: data });
      return { data: response.data };
    } catch (axiosError) {
      let err = axiosError;
      return {
        error: { status: err.response?.status, data: err.response?.data },
      };
    }
  };

export const postApi = createApi({
  reducerPath: "postApi",
  refetchOnFocus: true,
  baseQuery: axiosBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com/posts",
  }),
  endpoints: (builder) => ({
    getPosts: builder.query<IPost[], null>({
      query: () => "posts",
    }),
    getPostById: builder.query<IPost, { id: string }>({
      query: ({ id }) => `users/${id}`,
    }),
  }),
});

export const { getPosts, getPostById } = postApi.endpoints;
