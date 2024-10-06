import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import apiRoutes from '../routes';

export const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async (messageData, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(apiRoutes.messagesPath(), messageData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


export const fetchMessages = createAsyncThunk(
  'chat/fetchMessages',
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem('token'); 
      if (!token) {
        throw new Error('Токен не найден');
      }

      const response = await axios.get(apiRoutes.messagesPath(), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


const initialState = {
  messages: [],
  loading: false,
  error: null,
  isLoggedIn: false,
  socketConnected: false,
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    resetChatState: (state) => {
      state.channels = [];
      state.messages = [];
      state.loading = false;
      state.error = null;
      state.socketConnected = false;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
  },
    addChanel: (state, action) => {
    state.channels.push(action.payload);
  },
    extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
      builder
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.messages.push(action.payload);
        state.loading = false;
      })
  },
});

export const { resetChatState, addMessage } = messagesSlice.actions;
export const messagesReducer = messagesSlice.reducer;
