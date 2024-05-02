import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://localhost:5000',
  });

const signupApi = async (userData) => {
  try {
    const response = await api.post('/user/signup', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const signupGoogle = async (userData) => {
  try {
    const response = await api.post('/user/signupGoogle', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const signupCheck = async (userData) => {
  try {
    const response = await api.post('/user/check', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const signIn = async (email, password) => {
  try {
    const response = await api.post('/user/signin', { email, password });
    return { success: true, data: response.data.data };
  } catch (error) {
    return { success: false, error: error.response.data.error };
  }
};

const getAllUsers = async () => {
  try {
    const response = await api.get(`/user/getAllUser`);
    return response.data; // Assuming the API returns data in this structure
  } catch (error) {
    // It's usually better to throw the error again here so that the calling component decides how to handle it
    throw error;
  }
};

const updateUser = async (userId, userData) => {
  try {
    const response = await api.put(`/user/updateUser/${userId}`, userData);
    return response.data; // Assuming the API returns data in this structure
  } catch (error) {
    // Handle or throw error
    throw error;
  }
};

const deleteUser = async (userId) => {
  try {
    const response = await api.delete(`/user/deleteUser/${userId}`);
    return response.data; // Assuming the API returns data in this structure
  } catch (error) {
    // Handle or throw error
    throw error;
  }
};

const fetchUserID = async (userId) => {
  try {
    const response = await api.get(`/user/getUserById/${userId}`);
    const userData = response.data;
    return userData;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};

const fetchUserEmail = async (email) => {
  try {
    const response = await api.get(`/user/getUserByEmail/${email}`);
    const userData = response.data.data;
    return userData;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};


const fetchUserData = async (token) => {
  try {
    const response = await api.post('/user/data', {token});
    console.log(response);
    return response.data;  // Return the whole data object for more detailed handling
  } catch (error) {
    throw error;
  }
};



  const forgotPassword = async (email) => {
    try {
      const response = await api.post('/user/forgotPassword', {email});
      console.log(response.data);  // Good to keep for debugging
      return response.data;  // Return the whole data object for more detailed handling
    } catch (error) {
      throw error;
      ;
    }
};

const resetPassword = async (email, otp, newPassword) => {
    try {
      const response = await api.post('/user/resetPassword', {email, otp: parseInt(otp), newPassword});
      console.log(response);
      return response.data;  // Return the whole data object for more detailed handling
    } catch (error) {
      throw error;
    }
};

  

export default {
  getAllUsers,
  updateUser,
  deleteUser,
  fetchUserID,
  signupApi,
  signIn,
  signupGoogle,
  fetchUserEmail,
  signupCheck,
  fetchUserData,
  forgotPassword,
  resetPassword
};
