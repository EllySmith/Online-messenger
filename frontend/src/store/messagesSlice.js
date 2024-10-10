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
  },
);

export const fetchMessages = createAsyncThunk(
  'chat/fetchMessages',
  async (_, { extra: rejectWithValue }) => {
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
      return rejectWithValue(error.message);
    }
  },
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
    resetChatState: () => ({
      channels: [],
      messages: [],
      loading: false,
      error: null,
      socketConnected: false,
    }),
    addMessage: (state, action) => ({
      ...state,
      messages: [...state.messages, action.payload],
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => ({
        ...state,
        loading: true,
        error: null,
      }))
      .addCase(fetchMessages.fulfilled, (state, action) => ({
        ...state,
        loading: false,
        messages: action.payload,
      }))
      .addCase(fetchMessages.rejected, (state, action) => ({
        ...state,
        loading: false,
        error: action.payload,
      }))
      .addCase(sendMessage.fulfilled, (state) => ({
        ...state,
        loading: false,
      }));
  },
});

export const { resetChatState, addMessage } = messagesSlice.actions;
export const messagesReducer = messagesSlice.reducer;
