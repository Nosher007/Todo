import axios from 'axios';
import { LOGIN } from './apiConnection';

export const login = async (data) => {
  try {
    const response = await axios.post(LOGIN, data);
    return response.data; // Return the response data on success
  } catch (error) {
    throw new Error('Login failed'); // Throw an error if login fails
  }
};
