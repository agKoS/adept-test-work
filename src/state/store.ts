import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { companiesReducer, companiesName } from "./companiesSlice";
import { employeesName, employeesReducer } from "./employeesSlice";

export const store = configureStore({
    reducer: {
        [companiesName]: companiesReducer,
        [employeesName]: employeesReducer,
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
