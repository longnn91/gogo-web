import { createSelector } from "@reduxjs/toolkit";

import { GlobalState, initialState } from "./global.slice";

const selectDomain = (state: { global: GlobalState }) =>
  state.global || initialState;

export const selectAppConfig = createSelector(
  [selectDomain],
  (globalState) => globalState.appConfig
);

export const selectThemeConfig = createSelector(
  [selectDomain],
  (globalState) => globalState.appConfig.themeConfig
);
