import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://localhost:5000',
  });

  const AddCheckoutApi = async (cdata) => {
    console.log('cdata =>>:', cdata);
    try {
      const response = await api.post('/checkout/create', cdata);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const getAllProductApi = async () => {
    try {
      const response = await api.get('/checkout/get');
      return response.data; // Assuming the API returns data in this structure
    } catch (error) {
      // It's usually better to throw the error again here so that the calling component decides how to handle it
      throw error;
    }
  };

  const deleteCheckoutApi = async (userId) => {
    try {
      const response = await api.delete(`/checkout/delete/${userId}`);
      return response.data; // Assuming the API returns data in this structure
    } catch (error) {
      // Handle or throw error
      throw error;
    }
  };

  const getCheckoutApi = async (id) => {
    try {
      const response = await api.get(`/checkout/${id}`);
      const userData = response.data;
      return userData;
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  };

  const updateCheckoutApi = async (id, data) => {
    try {
      const response = await api.put(`/checkout/update/${id}`, data);
      return response.data; // Assuming the API returns data in this structure
    } catch (error) {
      // Handle or throw error
      throw error;
    }
  };

  export default {
    AddCheckoutApi,
    getAllProductApi,
    deleteCheckoutApi,
    getCheckoutApi,
    updateCheckoutApi
  };