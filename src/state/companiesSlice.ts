import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import type { ICompaniesTableRowData } from "@types-components/CompanyTable";
import { companiesData } from "@utils/fake-data";
import { RootState } from "./store";

export interface ICompaniesSlice {
    page: number;
}

export const companiesName = "companies";

const initialState: ICompaniesSlice = {
    page: 1,
};

const adapter = createEntityAdapter<ICompaniesTableRowData>({
    selectId: (item) => item.id,
});

const slice = createSlice({
    name: companiesName,
    initialState: adapter.getInitialState<ICompaniesSlice>(initialState),
    reducers: {
        initState: (state) => {
            adapter.setAll(state, companiesData);
        },
    },
});

const adapterSelectors = adapter.getSelectors<RootState>((state) => state[companiesName]);

export const companiesSelectors = {
    ...adapterSelectors,
};

export const companiesReducer = slice.reducer;
export const companiesActions = slice.actions;
