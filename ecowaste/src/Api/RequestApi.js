import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://localhost:5000',
  });

const addRequestApi = async (reqData) => {
    try {
      const response = await api.post('/request/add', reqData);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const getAllRequestApi = async () => {
    try {
      const response = await api.get('/request/getall');
      return response.data; // Assuming the API returns data in this structure
    } catch (error) {
      // It's usually better to throw the error again here so that the calling component decides how to handle it
      throw error;
    }
  };

  const deleteRequestApi = async (userId) => {
    try {
      const response = await api.delete(`/request/delete/${userId}`);
      return response.data; // Assuming the API returns data in this structure
    } catch (error) {
      // Handle or throw error
      throw error;
    }
  };

  const getRequestApi = async (id) => {
    try {
      const response = await api.get(`/request/get/${id}`);
      const userData = response.data;
      return userData;
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  };

  const updateRequestApi = async (id, data) => {
    try {
      const response = await api.put(`/request/update/${id}`, data);
      return response.data; // Assuming the API returns data in this structure
    } catch (error) {
      // Handle or throw error
      throw error;
    }
  };

  export default{
                    addRequestApi,
                    getAllRequestApi,
                    deleteRequestApi,
                    getRequestApi,
                    updateRequestApi
                };