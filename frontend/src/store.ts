import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import { apiSlice } from "./slices/apiSlice";
import { IGameData, IUpgrade } from "../../shared/types";

export interface IGameState {
  auth: { userInfo };
  gameData: IGameData;
  upgrades: { availableUpgrades: IUpgrade[] };
}

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true
});

export default store;
