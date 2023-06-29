import { createSlice } from '@reduxjs/toolkit';
import { usersApiSlice } from '../apis/usersApiSlice';

export interface IUser {
   name: string;
   surname: string;
   id: number;
}

export interface IUsers {
   users: IUser[];
}

const initialState: IUsers = {
   users: []
};

export const usersSlice = createSlice({
   name: 'users',
   initialState,
   reducers: {},
   extraReducers: builder => {
      builder.addMatcher(usersApiSlice.endpoints.getAllUsers.matchFulfilled, (state, { payload }) => {
         const { users, success } = payload;
         if (!success) {
         } else {
            state.users = users;
         }
      });
   }
});

export default usersSlice.reducer;
