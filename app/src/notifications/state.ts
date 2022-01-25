import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "store";

type Notification = {
  type: "success" | "error";
  id: string;
  message: string;
};

type NotificationsState = Notification[];

type AddPayload = {
  notification: Notification;
};

type RemovePayload = {
  id: string;
};

function existsOnArray(index: number) {
  return index !== -1;
}

const initialState: NotificationsState = [];

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    add(state: NotificationsState, action: PayloadAction<AddPayload>) {
      state.push(action.payload.notification);
    },
    remove(state: NotificationsState, action: PayloadAction<RemovePayload>) {
      const notificationIndex = state.findIndex(
        (notification) => notification.id === action.payload.id
      );

      if (existsOnArray(notificationIndex)) {
        state.splice(notificationIndex, 1);
      }
    },
  },
});

export const { add, remove } = notificationsSlice.actions;

export function getNotificationsSelector(state: RootState) {
  return state.notifications;
}

export const notificationsReducer = notificationsSlice.reducer;
