import { createSlice,PayloadAction} from "@reduxjs/toolkit";

interface State {
  activeLink: string|null;
}

const initialState: State = {
  activeLink: null,
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
