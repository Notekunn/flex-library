import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiInstance } from '../app/axiosClient';
import { RootState } from '../app/store';
import { IUser, IUserResponse } from '../constants/interface';
import { TOKEN_EXPIRED_STORAGE_KEY, TOKEN_STORAGE_KEY } from '../constants/storageKey';
import * as Stripe from '@stripe/stripe-js';

interface LoginOKResponse {
  user: IUserResponse;
  token: {
    accessToken: string;
    accessTokenExpired: string;
  };
}

interface LoginPayload {
  email: string;
  password: string;
}

interface RegisterPayload extends LoginPayload {
  name: string;
  avatar: string;
}

interface AuthState {
  isLoggedIn: boolean;
  loading: 'idle' | 'loading' | 'success' | 'error';
  user?: IUserResponse;
  historyPayment?: Stripe.PaymentIntent[];
  error?: string;
}

const initialState: AuthState = {
  isLoggedIn: false,
  loading: 'idle',
};

export const loginAction = createAsyncThunk('auth/login', async (payload: LoginPayload) => {
  const { data } = await apiInstance.post<LoginOKResponse>('/auth/login', payload);
  return data;
});
export const registerAction = createAsyncThunk('auth/register', async (payload: RegisterPayload) => {
  const { data } = await apiInstance.post<LoginOKResponse>('/auth/register', payload);
  return data;
});

export const profileAction = createAsyncThunk('auth/profile', async () => {
  const { data } = await apiInstance.get<IUserResponse>('/user/me');
  return data;
});

export const logoutAction = createAsyncThunk('auth/logout', async () => {
  await AsyncStorage.removeItem(TOKEN_STORAGE_KEY);
  await AsyncStorage.removeItem(TOKEN_EXPIRED_STORAGE_KEY);
});

export const updateUserAction = createAsyncThunk('auth/updateUser', async (payload: IUser) => {
  const { data } = await apiInstance.post<IUserResponse>(`/user/me`, payload);
  return data;
});

export const changePasswordAction = createAsyncThunk('auth/changePassword', async (payload: { password: string }) => {
  const { data } = await apiInstance.post<IUserResponse>(`/user/me`, payload);
  return data;
});

export const updateCoinUserAction = createAsyncThunk(
  'auth/updateCoinUser',
  async (payload: { coin: number }, thunk) => {
    const { data } = await apiInstance.patch<IUserResponse>(`/user/coin`, payload);
    thunk.dispatch(profileAction());
    return data;
  },
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (buidler) => {
    [loginAction, registerAction].forEach((act) => {
      buidler
        .addCase(act.pending, (state) => {
          state.loading = 'loading';
          state.error = undefined;
        })
        .addCase(act.fulfilled, (state, payload) => {
          state.loading = 'success';
          state.isLoggedIn = true;
          state.user = payload.payload.user;
          AsyncStorage.setItem(TOKEN_STORAGE_KEY, payload.payload.token.accessToken);
          AsyncStorage.setItem(TOKEN_EXPIRED_STORAGE_KEY, payload.payload.token.accessTokenExpired);
        })
        .addCase(act.rejected, (state, payload) => {
          state.loading = 'error';
          state.error = payload.error.message;
        });
    });

    buidler
      .addCase(profileAction.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(profileAction.fulfilled, (state, payload) => {
        state.loading = 'success';
        state.isLoggedIn = true;
        state.user = payload.payload;
      })
      .addCase(profileAction.rejected, (state, payload) => {
        state.loading = 'error';
        state.isLoggedIn = false;
      });

    buidler
      .addCase(logoutAction.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.loading = 'success';
      })
      .addCase(logoutAction.rejected, (state) => {
        state.loading = 'error';
      });

    buidler
      .addCase(changePasswordAction.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(changePasswordAction.fulfilled, (state, payload) => {
        state.loading = 'success';
        state.user = payload.payload;
      })
      .addCase(changePasswordAction.rejected, (state, payload) => {
        state.loading = 'error';
        state.error = payload.error.message;
      });
  },
});

export default authSlice.reducer;

export const selectLoading = (state: RootState) => state.auth.loading;
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectUser = (state: RootState) => state.auth.user;
export const selectError = (state: RootState) => state.auth.error;
export const selectOwnStore = (state: RootState) => state.auth.user?.store;
