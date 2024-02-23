import axios from 'axios';
import { CREATETODO, LOGIN, MARK_COMPLETE, REGISTER, TODO_DELETE, TODO_LIST } from './apiConnection';

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


export const getTodosApi = async () => {
  let token = getToken(); // Assuming you have a function getToken() that retrieves the token
  try {
    const response = await axios.get(TODO_LIST, {
      headers: {
        auth: token
      }
    });
    return response.data; // Return the list of todos on success
  } catch (error) {
    throw new Error('Failed to fetch todos'); // Throw an error if fetching todos fails
  }
};



export const deleteTodo = async (data) => {
  let token = getToken(); // Assuming you have a function getToken() that retrieves the token
  try {
    const response = await axios.post(TODO_DELETE, data, {
      headers: {
        auth: token
      }
    });
    return response.data; // Return the response data on success
  } catch (error) {
    throw new Error('Create Todo Failed'); // Throw an error if creating todo fails
  }
};


export const markedTodo = async (data) => {
  let token = getToken(); // Assuming you have a function getToken() that retrieves the token
  try {
    const response = await axios.post(MARK_COMPLETE, data, {
      headers: {
        auth: token
      }
    });
    return response.data; // Return the response data on success
  } catch (error) {
    throw new Error('Create Todo Failed'); // Throw an error if creating todo fails
  }
};




export function getToken(){
  let user=localStorage.getItem('user')
  if(!user)return
  const userObj=JSON.parse(user);
  return userObj.token;
}
