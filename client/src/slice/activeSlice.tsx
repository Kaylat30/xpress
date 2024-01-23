import { createSlice,} from "@reduxjs/toolkit";

interface State {
  isActive: boolean;
}

const initialState: State = {
  isActive: false,
};

const activeSlice = createSlice({
  name: "active",
  initialState,
  reducers: {
    setActive: (state) => {
      state.isActive = !state.isActive;
    }
  },
});

export const { setActive} = activeSlice.actions;
export default activeSlice.reducer;
