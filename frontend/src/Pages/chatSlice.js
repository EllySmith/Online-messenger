import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import io from 'socket.io-client';
import apiRoutes from '../routes';

let socket;

export const initializeSocket = createAsyncThunk(
  'chat/initializeSocket',
  async (_, thunkAPI) => {
    if (!socket) { 
      socket = io('http://localhost:3000'); 

      socket.on('newMessage', (message) => {
        thunkAPI.dispatch(addMessage(message));
      });
    }

    return true;
  }
);

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

export const fetchChannels = createAsyncThunk(
  'chat/fetchChannels',
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem('token'); 
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
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteChannel = createAsyncThunk(
  'chat/deleteChannel',
  async (channelId, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(apiRoutes.channelPath(channelId), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return channelId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const changeChannelName = createAsyncThunk(
  'chat/changeChannelName',
  async ({ channelId, newName }, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.patch(apiRoutes.channelPath(channelId), { name: newName }, {
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
  channels: [],
  messages: [],
  loading: false,
  error: null,
  isLoggedIn: false,
  socketConnected: false,
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
      builder
      .addCase(initializeSocket.fulfilled, (state) => {
        state.socketConnected = true;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteChannel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteChannel.fulfilled, (state, action) => {
        state.loading = false;
        state.channels = state.channels.filter(channel => channel.id !== action.payload);
      })
      .addCase(deleteChannel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(changeChannelName.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changeChannelName.fulfilled, (state, action) => {
        state.loading = false;
        const updatedChannel = action.payload;
        const channelIndex = state.channels.findIndex(channel => channel.id === updatedChannel.id);
        if (channelIndex >= 0) {
          state.channels[channelIndex] = updatedChannel;
        }
      })
      .addCase(changeChannelName.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetChatState, addMessage, addChanel } = chatSlice.actions;
export const chatReducer = chatSlice.reducer;
