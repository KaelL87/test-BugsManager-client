import { apiSlice } from "../middleware/apiSlice";

export const bugsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllBugs: builder.query({
      query: () => ({
        url: '/allbugs',
        method: "GET",
      }),
    }),
    addBug: builder.mutation({
      query: (data) => ({
        url: `/bug`,
        method: "POST",
        body: { ...data },
      }),
    }),
    filtersBugs: builder.query({
      query: (data) => ({
        url: `/bugs?project_id=${data.project_id}&user_id=${data.user_id}&start_date=${data.start_date}&end_date=${data.end_date}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useLazyGetAllBugsQuery,
  useAddBugMutation,
  useLazyFiltersBugsQuery
} = bugsApiSlice;
