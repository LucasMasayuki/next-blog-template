/* eslint-disable import/no-cycle */
import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { colorModeSlice } from '../stores/color-mode-slice';
import { notificationSlice } from '../stores/notification-slice';

export const store = configureStore({
  reducer: {
    colorMode: colorModeSlice.reducer,
    notification: notificationSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
