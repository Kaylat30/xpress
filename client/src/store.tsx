import { configureStore } from "@reduxjs/toolkit";
import activeReducer from "./slice/activeSlice";
import activeLinkReducer from './slice/activeLinkSlice';
import userSlice from "./slice/userSlice";
import clientSlice from "./slice/clientSlice";
import deliverySlice from "./slice/deliverySlice";
import packSlice from "./slice/packSlice";
import itemSlice from "./slice/itemSlice";
import staffSlice from "./slice/staffSlice";
import stageSlice from "./slice/stageSlice";
  
  const store = configureStore({
    reducer: {
      active: activeReducer,
      activelink:activeLinkReducer,
      user:userSlice,
      clients:clientSlice,
      delivery:deliverySlice,
      pack:packSlice,
      item:itemSlice,
      staff:staffSlice,
      stagedItems:stageSlice
    },
    
  });
  export default store;