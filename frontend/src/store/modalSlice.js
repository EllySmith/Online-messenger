import { createSlice } from '@reduxjs/toolkit';

const initialState = {
     type: 'add',
     visible: false,
     newChannel: {
     newChannelId: null,
     newChannelName: '',
     newChannelRemovable: true
     }
   };

   const modalSlice = createSlice({
     name: 'modal',
     initialState,
     reducers: {
       showModal: (state) => {
         state.visible = true;
       },
       hideModal: (state) => {
         state.visible = false;
       },
       changeModalType: (state, action) => {
          state.type = action.payload;
       },
       formPatch: (state, action) => {
         state.newChannel.newChannelName = action.payload.name;
       }
     }
   });
   
   export const { showModal, hideModal, formNewChannel, formPatch, changeModalType } = modalSlice.actions;
   export const modalReducer = modalSlice.reducer;
