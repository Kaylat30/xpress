import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { addStagedItem, getStagedItems, deleteStagedItem, updateStagedItem, getStagedItemInfo } from '../api'; // Adjust the path to your API functions

interface StagedItem {
    itemId: string;
    item: string;
    status: string;
    clientId: string;
    name: string;
    address: string;
    contact: number;
    email: string;
    user: string;
}


interface StagedItemState {
  stagedItems: StagedItem[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: StagedItemState = {
  stagedItems: [],
  status: 'idle',
  error: null,
};

export const addStagedItemAsync = createAsyncThunk<StagedItem, Omit<StagedItem, 'itemId' | 'status' | 'clientId'>, { rejectValue: { message: string } }>(
  'stagedItems/addStagedItem',
  async (newStagedItem, { rejectWithValue }) => {
    try {
      const data = await addStagedItem(
        newStagedItem.item,
        newStagedItem.name,
        newStagedItem.address,
        newStagedItem.contact,
        newStagedItem.email
      );
      return data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue({ message: error.message });
      }
    }
  }
);

export const getStagedItemsAsync = createAsyncThunk<StagedItem[], void, { rejectValue: { message: string } }>(
  'stagedItems/getStagedItems',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getStagedItems();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue({ message: error.message });
      }
    }
    return [];
  }
);

export const getStagedItemInfoAsync = createAsyncThunk< StagedItem, string, { rejectValue: { message: string } }>(
  'stagedItems/getStagedItemInfo',
  async (itemId, { rejectWithValue }) => {
    try {
      const data = await getStagedItemInfo(itemId);
      return data;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error fetching blog details:', error.message);
        throw rejectWithValue({ message: error.message });
      }
      throw rejectWithValue({ message: 'An error occurred while fetching blog details' });
    }
  }
);

export const deleteStagedItemAsync = createAsyncThunk<string, { itemId: string; clientId: string }, { rejectValue: { message: string } }>(
  'stagedItems/deleteStagedItem',
  async (stagedItemIds, { rejectWithValue }) => {
    try {
      const data = await deleteStagedItem(stagedItemIds.itemId, stagedItemIds.clientId);
      return data; // Return the itemId to use in the fulfilled case
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue({ message: error.message });
      }
    }
  }
);

export const updateStagedItemAsync = createAsyncThunk<StagedItem, StagedItem, { rejectValue: { message: string } }>(
  'stagedItems/updateStagedItem',
  async (stagedItem, { rejectWithValue }) => {
    try {
      const data = await updateStagedItem(
        stagedItem.itemId,
        stagedItem.item,
        stagedItem.status!,
        stagedItem.clientId!,
        stagedItem.name,
        stagedItem.address,
        stagedItem.contact,
        stagedItem.email
      );
      return data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue({ message: error.message });
      }
    }
  }
);

const stagedItemSlice = createSlice({
  name: 'stagedItems',
  initialState,
  reducers: {
    clearStagedItems(state) {
      state.stagedItems = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addStagedItemAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(addStagedItemAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.stagedItems.push(action.payload);
        state.error = null;
      })
      .addCase(addStagedItemAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message ?? 'Unknown error';
      })
      .addCase(getStagedItemsAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getStagedItemsAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.stagedItems = action.payload;
        state.error = null;
      })
      .addCase(getStagedItemsAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message ?? 'Unknown error';
      })
      .addCase(getStagedItemInfoAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null; // Clear error on pending
      })
      .addCase(getStagedItemInfoAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.stagedItems = [action.payload]; // Update single client in array
        state.error = null; // Clear error on success
      })
      .addCase(getStagedItemInfoAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message ?? 'Unknown error'; // Set error message
      })
      .addCase(deleteStagedItemAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(deleteStagedItemAsync.fulfilled, (state, action: PayloadAction<string>) => {
        state.status = 'succeeded';
        state.stagedItems = state.stagedItems.filter(item => item.itemId !== action.payload);
        state.error = null;
      })
      .addCase(deleteStagedItemAsync.rejected, (state, action: PayloadAction<{ message: string } | undefined>) => {
        state.status = 'failed';
        state.error = action.payload?.message ?? 'Unknown error';
      })
      .addCase(updateStagedItemAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateStagedItemAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.stagedItems.findIndex(item => item.itemId === action.payload.itemId);
        if (index !== -1) {
          state.stagedItems[index] = action.payload;
        }
        state.error = null;
      })
      .addCase(updateStagedItemAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message ?? 'Unknown error';
      });
  },
});

export const { clearStagedItems } = stagedItemSlice.actions;

// Selector functions
export const selectStagedItems = (state: { stagedItems: StagedItemState }) => state.stagedItems.stagedItems;
export const selectStagedItem = (state: { stagedItems:StagedItemState }) => state.stagedItems.stagedItems[0]; 
export const selectStagedItemById = (itemId: string) => (state: { stagedItems: StagedItemState }): StagedItem | undefined => {
  return state.stagedItems.stagedItems.find(stagedItem => stagedItem.itemId === itemId);
};
export const selectStagedItemsStatus = (state: { stagedItems: StagedItemState }) => state.stagedItems.status;
export const selectStagedItemsError = (state: { stagedItems: StagedItemState }) => state.stagedItems.error;

export default stagedItemSlice.reducer;
