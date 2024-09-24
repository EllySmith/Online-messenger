import { configureStore } from '@reduxjs/toolkit';
import { messagesReducer } from './messagesSlice';
import { channelsReducer } from './channelsSlice'; 
import { modalReducer } from './modalSlice';

const store = configureStore({
     reducer: {
       messages: messagesReducer,
      channels: channelsReducer,
      modal: modalReducer,
     },
   });
   
export default store;