import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import createSagaMiddleWare from "redux-saga";
import rootSaga from "./rootSaga";

import { globalReducer } from "./global/global.slice";

const sagaMiddleware = createSagaMiddleWare();

export const store = configureStore({
  reducer: {
    global: globalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
