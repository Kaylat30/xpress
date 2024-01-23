import { createSlice,PayloadAction} from "@reduxjs/toolkit";

interface State {
  activeLink: string;
}

const initialState: State = {
  activeLink: "Dashboard",
};

const activeLink = createSlice({
  name: "activelink",
  initialState,
  reducers: {
    setActive: (state, action: PayloadAction<string>) => {
        state.activeLink = action.payload;
      },
  },
});

export const { setActive} = activeLink.actions;
export default activeLink.reducer;
