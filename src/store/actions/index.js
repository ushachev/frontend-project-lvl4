import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import routes from '../../routes.js';

const fetchChatData = createAsyncThunk(
  'chatData/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const { token } = JSON.parse(localStorage.getItem('user'));
      const headers = { Authorization: `Bearer ${token}` };

      const { data } = await axios.get(routes.chatDataPath(), { headers });

      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export default fetchChatData;
