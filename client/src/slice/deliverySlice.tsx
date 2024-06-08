import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getDeliveryItems, deleteDeliveryItem, updateDeliveryItem, getDeliveryInfo } from '../api'; 

interface DeliveryItem {
  itemId: string;
  item: string;
  status: string;
  clientId: string;
  driverId: string;
  cashierIn: string;
  cashierOut: string;
  
}

interface DeliveryState {
  deliveryItems: DeliveryItem[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: DeliveryState = {
  deliveryItems: [],
  status: 'idle',
  error: null,
};

export const getDeliveryItemsAsync = createAsyncThunk<DeliveryItem[], void, { rejectValue: { message: string } }>(
  'delivery/getDeliveryItems',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getDeliveryItems();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue({ message: error.message });
      }
    }
    return [];
  }
);

export const getDeliveryInfoAsync = createAsyncThunk<DeliveryItem , string, { rejectValue: { message: string } }>(
  'delivery/getDeliveryInfo',
  async (itemId, { rejectWithValue }) => {
    try {
      const data = await getDeliveryInfo(itemId);
      return data;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error fetching delivery details:', error.message);
        throw rejectWithValue({ message: error.message });
      }
      throw rejectWithValue({ message: 'An error occurred while fetching blog details' });
    }
  }
);

export const deleteDeliveryItemAsync = createAsyncThunk<void, string, { rejectValue: { message: string } }>(
  'delivery/deleteDeliveryItem',
  async (itemId, { rejectWithValue }) => {
    try {
      await deleteDeliveryItem(itemId);
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue({ message: error.message });
      }
    }
  }
);

export const updateDeliveryItemAsync = createAsyncThunk<DeliveryItem, { itemId: string; item: string; status: string; clientId: string; driverId: string; cashierIn: string; cashierOut: string }, { rejectValue: { message: string } }>(
  'delivery/updateDeliveryItem',
  async ({ itemId, item, status, clientId, driverId, cashierIn, cashierOut }, { rejectWithValue }) => {
    try {
      const data = await updateDeliveryItem(itemId, item, status, clientId, driverId, cashierIn, cashierOut);
      return data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue({ message: error.message });
      }
    }
  }
);

const deliverySlice = createSlice({
  name: 'delivery',
  initialState,
  reducers: {
    clearDeliveryItems(state) {
      state.deliveryItems = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDeliveryItemsAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null; // Clear error on pending
      })
      .addCase(getDeliveryItemsAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.deliveryItems = action.payload;
        state.error = null; // Clear error on success
      })
      .addCase(getDeliveryItemsAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message ?? 'Unknown error'; // Set error message
      })
      .addCase(getDeliveryInfoAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null; // Clear error on pending
      })
      .addCase(getDeliveryInfoAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.deliveryItems = [action.payload]; // Update single client in array
        state.error = null; // Clear error on success
      })
      .addCase(getDeliveryInfoAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message ?? 'Unknown error'; // Set error message
      })
      .addCase(deleteDeliveryItemAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null; // Clear error on pending
      })
      .addCase(deleteDeliveryItemAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.deliveryItems = state.deliveryItems.filter(item => item.itemId !== action.meta.arg);
        state.error = null; // Clear error on success
      })
      .addCase(deleteDeliveryItemAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message ?? 'Unknown error'; // Set error message
      })
      .addCase(updateDeliveryItemAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null; // Clear error on pending
      })
      .addCase(updateDeliveryItemAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const updatedItemIndex = state.deliveryItems.findIndex(item => item.itemId === action.payload.itemId);
        if (updatedItemIndex !== -1) {
          state.deliveryItems[updatedItemIndex] = action.payload;
        }
        state.error = null; // Clear error on success
      })
      .addCase(updateDeliveryItemAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message ?? 'Unknown error'; // Set error message
      });
  },
});

export const { clearDeliveryItems } = deliverySlice.actions;

// Selector functions
export const selectDeliveryItems = (state: { delivery: DeliveryState }) => state.delivery.deliveryItems;
export const selectDeliveryItem = (state: { delivery: DeliveryState }) => state.delivery.deliveryItems[0];
export const selectDeliveryById = (itemId: string) => (state: { delivery: DeliveryState }): DeliveryItem | undefined => {
  return state.delivery.deliveryItems.find(delivery => delivery.itemId === itemId);
};
export const selectStatus = (state: { delivery: DeliveryState }) => state.delivery.status;
export const selectError = (state: { delivery: DeliveryState }) => state.delivery.error;

export default deliverySlice.reducer;
