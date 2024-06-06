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
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export type RootState = ReturnType<typeof store.getState>;
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

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;