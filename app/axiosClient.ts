import axios from 'axios'
import Constants from 'expo-constants'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { TOKEN_STORAGE_KEY } from '../constants/storageKey'

export const apiInstance = axios.create({
  baseURL: Constants?.manifest?.extra?.apiURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

apiInstance.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem(TOKEN_STORAGE_KEY)

  if (token) {
    config.headers = {
      ...(config.headers || {}),
      Authorization: `Bearer ${token}`,
    }
  }
  if (config.method === 'POST' && typeof config.data === 'object') {
    config.data = JSON.stringify(config.data)
  }

  return config
})
