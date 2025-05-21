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
    copyProject: builder.mutation({
      query: (data) => ({
        url: `${PROJECTS_URL}/copy`,
        method: "POST",
        body: data
      })
    }),
    getProject: builder.query({
      query: (projectName) => ({
        url: `${PROJECTS_URL}/get/${projectName}`,
        method: "GET"
      })
    }),
    checkOwnership: builder.query({
      query: (projectName) => ({
        url: `${PROJECTS_URL}/check-ownership/${projectName}`,
        method: "GET"
      })
    })
  })
});

export const {
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useCopyProjectMutation,
  useGetProjectQuery,
  useCheckOwnershipQuery
} = projectsApiSlice;
