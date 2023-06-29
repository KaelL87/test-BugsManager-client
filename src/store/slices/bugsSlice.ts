import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { bugsApiSlice } from '../apis/bugsApiSlice';

export interface IBug {
   _id: string;
   creationDate: Date;
   description: string;
   id: string;
   project: string;
   username: string;
}

export interface IBugs {
   bugs: IBug[];
   addedBug: boolean;
   isFiltered: boolean;
}

const initialState: IBugs = {
   bugs: [],
   addedBug: false,
   isFiltered: false,
};

export const bugsSlice = createSlice({
   name: 'bugs',
   initialState,
   reducers: {
      setResultsApi: (state, action: PayloadAction<IBug[]>) => {
         state.bugs = action.payload;
      },
      setAddedBug: (state, action: PayloadAction<boolean>) => {
         state.addedBug =  action.payload;
      },
      setIsFiltered: (state, action: PayloadAction<boolean>) => {
         state.isFiltered =  action.payload;
      }
   },
   extraReducers: builder => {
      builder.addMatcher(bugsApiSlice.endpoints.getAllBugs.matchFulfilled, (state, { payload }) => {
         const { bugs } = payload;
         console.log(payload);
         state.bugs = bugs;
      });
   }
});

export const { setResultsApi, setAddedBug, setIsFiltered } = bugsSlice.actions;

export default bugsSlice.reducer;
