import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addItem, getItem, deleteItem, updateItem, checkout, getItemInfo } from '../api'; // Adjust the path to your API functions

interface Item {
  itemId: string;
  item: string;
  status: string;
  clientId: string;
  name: string;
  address: string;
  contact: number;
  email: string;
}

interface ItemState {
  items: Item[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ItemState = {
  items: [],
  status: 'idle',
  error: null,
};

export const addItemAsync = createAsyncThunk<Item, string, { rejectValue: { message: string } }>(
  'item/addItem',
  async (itemId, { rejectWithValue }) => {
    try {
      const data = await addItem(itemId);
      return data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue({ message: error.message });
      }
    }
  }
);

export const getItemAsync = createAsyncThunk<Item[], void, { rejectValue: { message: string } }>(
  'item/getItem',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getItem();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue({ message: error.message });
      }
    }
    return [];
  }
);

export const getItemInfoAsync = createAsyncThunk<Item, string, { rejectValue: { message: string } }>(
  'item/getItemInfo',
  async (itemId, { rejectWithValue }) => {
    try {
      const data = await getItemInfo(itemId);
      return data;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error fetching Item details:', error.message);
        throw rejectWithValue({ message: error.message });
      }
      throw rejectWithValue({ message: 'An error occurred while fetching item details' });
    }
  }
);

export const deleteItemAsync = createAsyncThunk<void, string, { rejectValue: { message: string } }>(
  'item/deleteItem',
  async (itemId, { rejectWithValue }) => {
    try {
      await deleteItem(itemId);
      //return itemId;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue({ message: error.message });
      }
    }
  }
);

export const updateItemAsync = createAsyncThunk<Item, Item, { rejectValue: { message: string } }>(
  'item/updateItem',
  async (item, { rejectWithValue }) => {
    try {
      const data = await updateItem(item.itemId, item.item, item.status, item.clientId, item.name, item.address, item.contact, item.email);
      return data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue({ message: error.message });
      }
    }
  }
);

export const checkoutItemAsync = createAsyncThunk<string,{itemId:string,price:number} ,{ rejectValue: { message: string } }>(
  'item/checkoutItem',
  async (args, { rejectWithValue }) => {
    try {
      const data = await checkout(args.itemId,args.price);
      return data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue({ message: error.message });
      }
    }
  }
);

const itemSlice = createSlice({
  name: 'item',
  initialState,
  reducers: {
    clearItems(state) {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addItemAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(addItemAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items.push(action.payload);
        state.error = null;
      })
      .addCase(addItemAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message ?? 'Unknown error';
      })
      .addCase(getItemAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getItemAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
        state.error = null;
      })
      .addCase(getItemAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message ?? 'Unknown error';
      })
      .addCase(getItemInfoAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null; // Clear error on pending
      })
      .addCase(getItemInfoAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = [action.payload]; 
        state.error = null; // Clear error on success
      })
      .addCase(getItemInfoAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message ?? 'Unknown error'; // Set error message
      })
      .addCase(deleteItemAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(deleteItemAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = state.items.filter(item => item.itemId !== action.meta.arg);
        state.error = null;
      })
      .addCase(deleteItemAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message ?? 'Unknown error';
      })
      .addCase(updateItemAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateItemAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.items.findIndex(item => item.itemId === action.payload.itemId);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        state.error = null;
      })
      .addCase(updateItemAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message ?? 'Unknown error';
      })
      .addCase(checkoutItemAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(checkoutItemAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.items.findIndex(item => item.itemId === action.payload.itemId);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        state.error = null;
      })
      .addCase(checkoutItemAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message ?? 'Unknown error';
      });
  },
});

export const { clearItems } = itemSlice.actions;

// Selector functions
export const selectItems = (state: { item: ItemState }) => state.item.items;
export const selectItem = (state: { item: ItemState }) => state.item.items[0]; 
export const selectItemById = (itemId: string) => (state: { item: ItemState }): Item | undefined => {
  return state.item.items.find(item => item.itemId === itemId);
};
export const selectStatus = (state: { item: ItemState }) => state.item.status;
export const selectError = (state: { item: ItemState }) => state.item.error;

export default itemSlice.reducer;
