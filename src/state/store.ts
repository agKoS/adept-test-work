import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { companiesReducer, companiesName } from "./companiesSlice";

export const store = configureStore({
    reducer: {
        [companiesName]: companiesReducer,
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
