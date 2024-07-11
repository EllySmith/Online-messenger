import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Замените `apiRoutes` на ваш реальный импорт путей к API
import apiRoutes from '../routes';

// Создайте асинхронный thunk для получения данных о каналах и сообщениях
export const fetchChatData = createAsyncThunk(
  'chat/fetchData',
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem('token'); // Получаем токен из localStorage
      if (!token) {
        throw new Error('Токен не найден');
      }

      // Запрос к серверу для получения данных о каналах и сообщениях
      const response = await axios.get(apiRoutes.chatData(), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data; // Возвращаем данные, полученные с сервера
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Создаем начальное состояние для чата
const initialState = {
  channels: [],
  messages: [],
  loading: false,
  error: null,
};

// Создаем slice для управления состоянием чата
const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    // Добавляем reducers для обновления состояния приложения при получении данных
    resetChatState: (state) => {
      state.channels = [];
      state.messages = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: {
    // Обработка успешного завершения асинхронного thunk
    [fetchChatData.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [fetchChatData.fulfilled]: (state, action) => {
      state.loading = false;
      state.channels = action.payload.channels;
      state.messages = action.payload.messages;
    },
    // Обработка ошибки при выполнении асинхронного thunk
    [fetchChatData.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Экспортируем actions и reducers
export const { resetChatState } = chatSlice.actions;
export default chatSlice.reducer;
