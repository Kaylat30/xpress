import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { logoutUser,url } from '../api';

interface User {
  firstname: string;
  role: string;
}

interface UserState {
  user: User | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  sessionExpiresAt: number | null;
}

const initialState: UserState = {
  user: JSON.parse(localStorage.getItem('user') as string) || null,
  status: 'idle',
  error: null,
  sessionExpiresAt: JSON.parse(localStorage.getItem('sessionExpiresAt') as string) || null,
};



export const loginUserAsync = createAsyncThunk<User, { email: string; password: string }, { rejectValue: { message: string } }>(
    'user/loginUser',
    async ({ email, password }, { rejectWithValue }) => {      
  
      try {
        const res = await fetch(`${url}/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({staffId:email,password:password}),
          credentials: 'include',
        });
  
        const data = await res.json();
  
        if (!res.ok) {
          return rejectWithValue({ message: data.error });
        }
  
        return data;
      } catch (error) {
        if (error instanceof Error) {
          console.error('Login error: ' + error.message);
          return rejectWithValue({ message: error.message });
        } else {
          return rejectWithValue({ message: 'An error occurred while logging in' });
        }
      }
    }
  );

export const logoutUserAsync = createAsyncThunk<void, void>('user/logoutUser', async () => {
  try {
    await logoutUser();
    localStorage.removeItem('user');
    localStorage.removeItem('sessionExpiresAt');
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.sessionExpiresAt = null;
      localStorage.removeItem('user');
      localStorage.removeItem('sessionExpiresAt');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUserAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null; // Clear error on pending
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.error = null; // Clear error on success
        const sessionDuration = 300000 
        const sessionExpiresAt = Date.now() + sessionDuration;
        state.sessionExpiresAt = sessionExpiresAt;
        localStorage.setItem('user', JSON.stringify(action.payload));
        localStorage.setItem('sessionExpiresAt', JSON.stringify(sessionExpiresAt));
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message ?? 'Unknown error'; // Set error message
      })
      .addCase(logoutUserAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null; // Clear error on pending
      })
      .addCase(logoutUserAsync.fulfilled, (state) => {
        state.status = 'idle';
        state.user = null;
        state.sessionExpiresAt = null;
        state.error = null; // Clear error on success
      })
      .addCase(logoutUserAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Logout failed'; // Set error message
      });
  },
});

export const { logout } = userSlice.actions;

// Selector functions
export const selectUser = (state: { user: UserState }) => state.user.user;
export const selectStatus = (state: { user: UserState }) => state.user.status;
export const selectError = (state: { user: UserState }) => state.user.error;
export const selectSessionExpiresAt = (state: { user: UserState }) => state.user.sessionExpiresAt;
export const selectFirstName = (state: { user: UserState }) => state.user.user?.firstname;
export const selectRole = (state: { user: UserState }) => state.user.user?.role;

export default userSlice.reducer;
