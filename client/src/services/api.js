import axios from 'axios';
import { CREATETODO, LOGIN, REGISTER } from './apiConnection';

export const login = async (data) => {
  try {
    const response = await axios.post(LOGIN, data);
    return response.data; // Return the response data on success
  } catch (error) {
    throw new Error('Login failed'); // Throw an error if login fails
  }
};


export const register = async (data) => {
  try {
    const response = await axios.post(REGISTER, data);
    return response.data; // Return the response data on success
  } catch (error) {
    throw new Error('Register Failed'); // Throw an error if login fails
  }
};



export const createTodoApi = async (data) => {
  let token = getToken(); // Assuming you have a function getToken() that retrieves the token
  try {
    const response = await axios.post(CREATETODO, data, {
      headers: {
        auth: token
      }
    });
    return response.data; // Return the response data on success
  } catch (error) {
    throw new Error('Create Todo Failed'); // Throw an error if creating todo fails
  }
};



function getToken(){
  let user=localStorage.getItem('user')
  if(!user)return
  const userObj=JSON.parse(user);
  return userObj.token;
}
