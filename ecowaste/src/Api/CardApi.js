import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://localhost:5000',
  });

const AddCardApi = async (cardData) => {
    try {
      const response = await api.post('/card/add', cardData);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const productAddCardApi = async (cardData) => {
    try {
      const response = await api.post('/product/card/add', cardData);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export default{
                    AddCardApi,
                    productAddCardApi,
                };