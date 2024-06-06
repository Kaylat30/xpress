import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getPackItems, approvePackItem } from '../api'; 
interface PackItem {
  itemId: string;
  itemName: string;
  status: string;
}

interface PackState {
  packItems: PackItem[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: PackState = {
  packItems: [],
  status: 'idle',
  error: null,
};

export const getPackItemsAsync = createAsyncThunk<PackItem[], void, { rejectValue: { message: string } }>(
  'pack/getPackItems',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getPackItems();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue({ message: error.message });
      }
    }
    return [];
  }
);

export const approvePackItemAsync = createAsyncThunk<PackItem, string, { rejectValue: { message: string } }>(
  'pack/approvePackItem',
  async (itemId, { rejectWithValue }) => {
    try {
      const data = await approvePackItem(itemId);
      return data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue({ message: error.message });
      }
    }
  }
);

const packSlice = createSlice({
  name: 'pack',
  initialState,
  reducers: {
    clearPackItems(state) {
      state.packItems = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPackItemsAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null; // Clear error on pending
      })
      .addCase(getPackItemsAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.packItems = action.payload;
        state.error = null; // Clear error on success
      })
      .addCase(getPackItemsAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message ?? 'Unknown error'; // Set error message
      })
      .addCase(approvePackItemAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null; // Clear error on pending
      })
      .addCase(approvePackItemAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const approvedItemId = action.payload.itemId;
        const index = state.packItems.findIndex(item => item.itemId === approvedItemId);
        if (index !== -1) {
          state.packItems[index].status = 'approved'; // Update item status
        }
        state.error = null; // Clear error on success
      })
      .addCase(approvePackItemAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message ?? 'Unknown error'; // Set error message
      });
  },
});

export const { clearPackItems } = packSlice.actions;

// Selector functions
export const selectPackItems = (state: { pack: PackState }) => state.pack.packItems;
export const selectStatus = (state: { pack: PackState }) => state.pack.status;
export const selectError = (state: { pack: PackState }) => state.pack.error;

export default packSlice.reducer;
