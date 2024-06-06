import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addClient, getClients, deleteClient, updateClient } from '../api'; 

interface Client {
  clientId: string;
  name: string;
  address: string;
  contact: string;
  email: string;
}

interface ClientState {
  clients: Client[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ClientState = {
  clients: [],
  status: 'idle',
  error: null,
};

export const addClientAsync = createAsyncThunk<Client, { name: string; address: string; contact: string; email: string }, { rejectValue: { message: string } }>(
  'clients/addClient',
  async ({ name, address, contact, email }, { rejectWithValue }) => {
    try {
      const data = await addClient(name, address, contact, email);
      return data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue({ message: error.message });
      }
    }
  }
);

export const getClientsAsync = createAsyncThunk<Client[], void, { rejectValue: { message: string } }>(
  'clients/getClients',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getClients();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue({ message: error.message });
      }
    }
    return [];
  }
);

export const deleteClientAsync = createAsyncThunk<void, string, { rejectValue: { message: string } }>(
  'clients/deleteClient',
  async (clientId, { rejectWithValue }) => {
    try {
      await deleteClient(clientId);
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue({ message: error.message });
      }
    }
  }
);

export const updateClientAsync = createAsyncThunk<Client, { clientId: string; name: string; address: string; contact: string; email: string }, { rejectValue: { message: string } }>(
  'clients/updateClient',
  async ({ clientId, name, address, contact, email }, { rejectWithValue }) => {
    try {
      const data = await updateClient(clientId, name, address, contact, email);
      return data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue({ message: error.message });
      }
    }
  }
);

const clientSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {
    clearClients(state) {
      state.clients = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addClientAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null; // Clear error on pending
      })
      .addCase(addClientAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.clients.push(action.payload);
        state.error = null; // Clear error on success
      })
      .addCase(addClientAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message ?? 'Unknown error'; // Set error message
      })
      .addCase(getClientsAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null; // Clear error on pending
      })
      .addCase(getClientsAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.clients = action.payload;
        state.error = null; // Clear error on success
      })
      .addCase(getClientsAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message ?? 'Unknown error'; // Set error message
      })
      .addCase(deleteClientAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null; // Clear error on pending
      })
      .addCase(deleteClientAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.clients = state.clients.filter(client => client.clientId !== action.meta.arg);
        state.error = null; // Clear error on success
      })
      .addCase(deleteClientAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message ?? 'Unknown error'; // Set error message
      })
      .addCase(updateClientAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null; // Clear error on pending
      })
      .addCase(updateClientAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const updatedClientIndex = state.clients.findIndex(client => client.clientId === action.payload.clientId);
        if (updatedClientIndex !== -1) {
          state.clients[updatedClientIndex] = action.payload;
        }
        state.error = null; // Clear error on success
      })
      .addCase(updateClientAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message ?? 'Unknown error'; // Set error message
      });
  },
});

export const { clearClients } = clientSlice.actions;

// Selector functions
export const selectClients = (state: { clients: ClientState }) => state.clients.clients;
export const selectClientById = (clientId: string) => (state: { clients: ClientState }) =>
  state.clients.clients.find(client => client.clientId === clientId);
export const selectStatus = (state: { clients: ClientState }) => state.clients.status;
export const selectError = (state: { clients: ClientState }) => state.clients.error;

export default clientSlice.reducer;
