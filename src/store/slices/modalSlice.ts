import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '..';

export interface IModalRegister {
  name: string;
}
export type IModal = {
  modals: Array<IModalRegister>;
  confirm: string;
};

const initialState: IModal = { modals: [], confirm: "" };

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    push: (state, action: PayloadAction<IModalRegister>) => {
      state.modals.push(action.payload);
    },
    pop: state => {
      if (state.modals.length > 0) state.modals.pop();
    },    
    setConfirm: (state, action: PayloadAction<string>) => {
      state.confirm = action.payload;
    },
    reset: () => initialState,
  },
});

export const { push, pop, reset, setConfirm } = modalSlice.actions;

export const stateModal = (state: RootState): IModal => state.modal;

export default modalSlice.reducer;
