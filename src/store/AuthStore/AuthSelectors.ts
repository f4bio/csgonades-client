import { AppState } from "../rootReducer";

export const userSelector = (state: AppState) => state.authStore.user;

export const tokenSelector = (state: AppState) => state.authStore.token;
