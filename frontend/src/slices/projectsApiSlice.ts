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
    renderProject: builder.query({
      query: (projectId) => ({
        url: `${PROJECTS_URL}/render/${projectId}`,
        method: "GET"
      })
    })
  })
});

export const { useCreateProjectMutation, useRenderProjectQuery } =
  projectsApiSlice;
