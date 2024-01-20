import { configureStore,ThunkAction,Action } from "@reduxjs/toolkit";
import themeReducer from "./slice/themeSlice";
import { ThemeState } from "./slice/themeSlice";

const loadState = (): { theme: ThemeState } | undefined => {
    try {
      const serializedState = localStorage.getItem('themeState');
      if (serializedState === null) {
        return undefined;
      }
      return JSON.parse(serializedState);
    } catch (err) {
      return undefined;
    }
  };
  
  const saveState = (state: { theme: ThemeState }) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('themeState', serializedState);
    } catch (err) {
      // Handle errors
    }
  };
  
  const store = configureStore({
    reducer: {
      theme: themeReducer,
    },
    preloadedState: loadState(),
  });
  
  store.subscribe(() => {
    saveState({ theme: store.getState().theme });
  });
  
  export type RootState = ReturnType<typeof store.getState>;
  export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
  >;
  
  export default store;