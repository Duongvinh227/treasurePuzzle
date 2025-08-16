// src/services/treasureMapService.js
import treasureMapApi from '../api/treasureMapApi';

const treasureMapService = {
  async saveMapAndInfo(data) {
    return await treasureMapApi.saveMapAndInfo(data);
  },

  async getAllHistory() {
    const history = await treasureMapApi.getAllHistory();
    return history;
  }

};

export default treasureMapService;
