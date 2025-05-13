import { apiSlice } from "./apiSlice";
const PROJECTS_URL = "/api/projects";

export const projectsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createProject: builder.mutation({
      query: (data) => ({
        url: `${PROJECTS_URL}/create`,
        method: "POST",
        body: data
      })
    }),
    updateProject: builder.mutation({
      query: (data) => ({
        url: `${PROJECTS_URL}/update`,
        method: "POST",
        body: data
      })
    }),
    getProject: builder.query({
      query: (projectId) => ({
        url: `${PROJECTS_URL}/get/${projectId}`,
        method: "GET"
      })
    })
  })
});

export const {
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useGetProjectQuery
} = projectsApiSlice;
