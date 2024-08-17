import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { defaultAppConfig, ENV } from "@/constants/app.const";
import { AppConfig } from "@/models/common.model";
import { Palette } from "@mui/material";

export interface GlobalState {
  loading: boolean;
  appConfig: AppConfig;
}

export const initialState: GlobalState = {
  loading: false,
  appConfig: defaultAppConfig as unknown as AppConfig,
};

export const pageLoadingSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    updateAppConfig(state, action: PayloadAction<AppConfig>) {
      state.appConfig = action.payload;
    },
    updateAppTheme(state, action: PayloadAction<Palette>) {
      state.appConfig.themeConfig = action.payload;
    },
  },
});

export const {
  actions: globalActions,
  reducer: globalReducer,
  name: sliceKey,
} = pageLoadingSlice;
