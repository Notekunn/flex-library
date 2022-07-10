import axios from 'axios';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TOKEN_STORAGE_KEY } from '../constants/storageKey';

export const apiInstance = axios.create({
  baseURL: Constants?.manifest?.extra?.apiURL,
  headers: {
    'Content-Type': 'application/json',
  },
  onUploadProgress: ({ loaded, total }) => loaded / total,
});

apiInstance.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem(TOKEN_STORAGE_KEY);

  if (token) {
    config.headers = {
      ...(config.headers || {}),
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  }
  if (config.method?.toUpperCase() === 'POST' && typeof config.data === 'object') {
    config.data = JSON.stringify(config.data);
  }

  return config;
});

apiInstance.interceptors.response.use(
  (e) => e,
  (error) => {
    const { status, data } = error?.response || {};
    const errorMessage = `${data.message}`;
    console.log(`Error with status ${status}: ${data.message}`);
    return Promise.reject(new Error(errorMessage));
  },
);
