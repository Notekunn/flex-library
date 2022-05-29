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

apiInstance.interceptors.response.use(
  (e) => e,
  (error) => {
    const status = error?.response?.status && `[${error.response.status}] `
    if (error?.response?.data?.message) {
      return Promise.reject(status + error.response.data.message)
    }
    if (error?.response?.data?.error?.message) {
      return Promise.reject(status + error.response.data.error.message)
    }
    if (error?.response?.data?.error?.errors) {
      return Promise.reject(status + error.response.data.error.errors)
    }
    if (error?.response?.data?.error) {
      return Promise.reject(status + error.response.data.error)
    }
    return Promise.reject(error)
  },
)
