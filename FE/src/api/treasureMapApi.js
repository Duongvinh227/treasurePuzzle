// src/api/treasureMapApi.js
import axiosClient from './axiosClient';

const treasureMapApi = {
  saveMapAndInfo: (data) => axiosClient.post('/api/Treasure/saveMapAndInfo', data),
  getAllHistory: (id) => axiosClient.get(`/api/Treasure/history`)
};

export default treasureMapApi;
