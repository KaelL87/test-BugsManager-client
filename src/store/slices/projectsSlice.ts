import { createSlice } from '@reduxjs/toolkit';
import { projectsApiSlice } from '../apis/projectsApiSlice';

export interface IProject {
   _id: string;
   createdAt: Date;
   description: string;
   name: string;
   id: number;
   updatedAt: Date;
}

export interface IProjects {
   projects: IProject[];
}

const initialState: IProjects = {
   projects: []
};

export const projectsSlice = createSlice({
   name: 'projects',
   initialState,
   reducers: { },
   extraReducers: builder => {
      builder.addMatcher(projectsApiSlice.endpoints.getAllProjects.matchFulfilled, (state, { payload }) => {
         const { projects, success } = payload;
         if (!success) {
         } else {
            state.projects = projects;
         }
      });
   }
});

export default projectsSlice.reducer;
