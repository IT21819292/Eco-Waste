import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://localhost:5000',
  });

const AddProductApi = async (productData) => {
    try {
      const response = await api.post('/product/add', productData);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const getProductApi = async () => {
    try {
      const response = await api.get('/product/get');
      return response.data; // Assuming the API returns data in this structure
    } catch (error) {
      // It's usually better to throw the error again here so that the calling component decides how to handle it
      throw error;
    }
  };

  export default{
                    AddProductApi,
                    getProductApi
                };