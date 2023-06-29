import { apiSlice } from "../middleware/apiSlice";

export const projectsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllProjects: builder.query({
      query: () => ({
        url: `/projects`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetAllProjectsQuery,
} = projectsApiSlice;
