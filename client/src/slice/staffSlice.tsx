import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addStaff, getStaff, deleteStaff, updateStaff, getStaffInfo } from '../api'; // Adjust the path to your API functions

interface Staff {
  staffId: string;
  name: string;
  branch: string;
  sex: string;
  role: string;
  dob: string;
  contact: number;
  address: string;
  email: string;
}

interface StaffState {
  staff: Staff[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: StaffState = {
  staff: [],
  status: 'idle',
  error: null,
};

export const addStaffAsync = createAsyncThunk<Staff, Omit<Staff, 'staffId'>, { rejectValue: { message: string } }>(
  'staff/addStaff',
  async (newStaff, { rejectWithValue }) => {
    try {
      const data = await addStaff(
        newStaff.name,
        newStaff.branch,
        newStaff.sex,
        newStaff.role,
        newStaff.dob,
        newStaff.contact,
        newStaff.address,
        newStaff.email
      );
      return data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue({ message: error.message });
      }
    }
  }
);

export const getStaffAsync = createAsyncThunk<Staff[], void, { rejectValue: { message: string } }>(
  'staff/getStaff',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getStaff();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue({ message: error.message });
      }
    }
    return [];
  }
);

export const getStaffInfoAsync = createAsyncThunk<Staff, string, { rejectValue: { message: string } }>(
  'staff/getStaffInfo',
  async (staffId, { rejectWithValue }) => {
    try {
      const data = await getStaffInfo(staffId);
      return data;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error fetching staff details:', error.message);
        throw rejectWithValue({ message: error.message });
      }
      throw rejectWithValue({ message: 'An error occurred while fetching blog details' });
    }
  }
);

export const deleteStaffAsync = createAsyncThunk<void, string, { rejectValue: { message: string } }>(
  'staff/deleteStaff',
  async (staffId, { rejectWithValue }) => {
    try {
      await deleteStaff(staffId);
      //return staffId;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue({ message: error.message });
      }
    }
  }
);

export const updateStaffAsync = createAsyncThunk<Staff, Staff, { rejectValue: { message: string } }>(
  'staff/updateStaff',
  async (staff, { rejectWithValue }) => {
    try {
      const data = await updateStaff(
        staff.staffId,
        staff.name,
        staff.branch,
        staff.sex,
        staff.role,
        staff.dob,
        staff.contact,
        staff.address,
        staff.email
      );
      return data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue({ message: error.message });
      }
    }
  }
);

const staffSlice = createSlice({
  name: 'staff',
  initialState,
  reducers: {
    clearStaff(state) {
      state.staff = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addStaffAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(addStaffAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.staff.push(action.payload);
        state.error = null;
      })
      .addCase(addStaffAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message ?? 'Unknown error';
      })
      .addCase(getStaffAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getStaffAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.staff = action.payload;
        state.error = null;
      })
      .addCase(getStaffAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message ?? 'Unknown error';
      })
      .addCase(getStaffInfoAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null; // Clear error on pending
      })
      .addCase(getStaffInfoAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.staff = [action.payload]; // Update single client in array
        state.error = null; // Clear error on success
      })
      .addCase(getStaffInfoAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message ?? 'Unknown error'; // Set error message
      })
      .addCase(deleteStaffAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(deleteStaffAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.staff = state.staff.filter(staff => staff.staffId !== action.meta.arg);
        state.error = null;
      })
      .addCase(deleteStaffAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message ?? 'Unknown error';
      })
      .addCase(updateStaffAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateStaffAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.staff.findIndex(staff => staff.staffId === action.payload.staffId);
        if (index !== -1) {
          state.staff[index] = action.payload;
        }
        state.error = null;
      })
      .addCase(updateStaffAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message ?? 'Unknown error';
      });
  },
});

export const { clearStaff } = staffSlice.actions;

// Selector functions
export const selectStaffs = (state: { staff: StaffState }) => state.staff.staff;
export const selectStaff = (state: { staff: StaffState }) => state.staff.staff[0]; 
export const selectStaffById = (staffId: string) => (state: { staff: StaffState }): Staff | undefined => {
  return state.staff.staff.find(staf => staf.staffId === staffId);
};
export const selectStaffStatus = (state: { staff: StaffState }) => state.staff.status;
export const selectStaffError = (state: { staff: StaffState }) => state.staff.error;

export default staffSlice.reducer;
