import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    isDateModal: false,
  },
  reducers: {
    isOpenDateModal: (state) => {
      state.isDateModal = true;
    },
    isCloseDateModal: (state) => {
      state.isDateModal = false;
    },
  },
});

export const { isCloseDateModal, isOpenDateModal } = uiSlice.actions;
