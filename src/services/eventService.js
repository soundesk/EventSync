import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

export const createEvent = async (eventData) => {
  try {
    const response = await axios.post(`${API_URL}/events`, eventData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getAllEvents = async () => {
  try {
    const response = await axios.get(`${API_URL}/events`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
