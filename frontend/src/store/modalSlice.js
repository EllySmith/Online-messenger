import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  visible: false,
  type: null,
  channelId: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showModal: (state, action) => {
      return {
        ...state,
        visible: true,
        type: action.payload.type,
        channelId: action.payload.channelId,
      };
    },
    hideModal: (state) => {
      return {
        ...state,
        visible: false,
        type: null,
        channelId: null,
      };
    },
    changeModalType: (state, action) => {
      return {
        ...state,
        type: action.payload.type,
      };
    },
  },
});

export const { showModal, hideModal, changeModalType } = modalSlice.actions;
export default modalSlice.reducer;
