import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import apiRoutes from '../routes';

export const fetchChannels = createAsyncThunk(
  'chat/fetchChannels',
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem('token'); 
      console.log(token);
      if (!token) {
        throw new Error('Токен не найден');
      }

      const response = await axios.get(apiRoutes.channelsPath(), {
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
      console.log('Messages:', response);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  channels: [],
  messages: [],
  loading: false,
  error: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    resetChatState: (state) => {
      state.channels = [];
      state.messages = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannels.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChannels.fulfilled, (state, action) => {
        state.loading = false;
        state.channels = action.payload;
      })
      .addCase(fetchChannels.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
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
  },
});

export const { resetChatState } = chatSlice.actions;
export const chatReducer = chatSlice.reducer;
