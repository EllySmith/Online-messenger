import { configureStore } from '@reduxjs/toolkit';
import { chatReducer } from './Pages/chatSlice';

const store = configureStore({
     reducer: {
       chat: chatReducer,
     },
   });
   
export default store;