import { configureStore } from "@reduxjs/toolkit";
import activeReducer from "./slice/activeSlice";
import activeLinkReducer from './slice/activeLinkSlice';
  
  const store = configureStore({
    reducer: {
      active: activeReducer,
      activelink:activeLinkReducer
    },
    
  });
  export default store;