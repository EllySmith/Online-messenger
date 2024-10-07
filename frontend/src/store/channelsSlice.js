import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import apiRoutes from '../routes';

export const fetchChannels = createAsyncThunk(
  'chat/fetchChannels',
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem('token'); 
      if (!token) throw new Error('Токен не найден');

      const response = await axios.get(apiRoutes.channelsPath(), {
        headers: { Authorization: `Bearer ${token}` },
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
        headers: { Authorization: `Bearer ${token}` },
      });
      return channelId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const changeChannelName = createAsyncThunk(
  'chat/changeChannelName',
  async ({ id, name }, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.patch(apiRoutes.channelPath(id), { name }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addChannel = createAsyncThunk(
  'chat/addChannel',
  async (channelData, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(apiRoutes.channelsPath(), channelData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  channels: [],
  currentChannelId: 1,
  loading: false,
  error: null,
  isLoggedIn: false,
  socketConnected: false,
};

const channelsSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    resetChatState: (state) => {
      state.channels = [
        { id: 1, name: 'general', removable: false },
        { id: 2, name: 'random', removable: false },
      ];
      state.currentChannelId = 1;
      state.messages = [];
      state.loading = false;
      state.error = null;
      state.socketConnected = false;
    },
    changeCurrentChannel: (state, action) => {
      state.currentChannelId = action.payload; 
    },
    addChannelAction: (state, action) => {
      state.channels.push(action.payload);
    },
    deleteChannelAction: (state, action) => {
      state.channels = state.channels.filter(channel => channel.id !== action.payload);
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
      })
      .addCase(addChannel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addChannel.fulfilled, (state, action) => {
        state.loading = false;
        state.channels.push(action.payload);
      })
      .addCase(addChannel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export const { resetChatState, addChannelAction, deleteChannelAction, changeCurrentChannel } = channelsSlice.actions;
export const channelsReducer = channelsSlice.reducer;
