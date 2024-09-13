import { configureStore } from '@reduxjs/toolkit';
import { messagesReducer } from './messagesSlice';
import { channelsReducer } from './channelsSlice'; 

const store = configureStore({
     reducer: {
       messages: messagesReducer,
      channels: channelsReducer,
     },
   });
   
export default store;