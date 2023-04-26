import { createEntityAdapter, createSelector, createSlice } from "@reduxjs/toolkit";
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
    sortComparer: (a, b) => a.companyName.localeCompare(b.companyName),
});

const slice = createSlice({
    name: companiesName,
    initialState: adapter.getInitialState<ICompaniesSlice>(initialState),
    reducers: {
        initState: (state) => {
            adapter.setAll(state, companiesData);
        },
        incrementPage: (state) => {
            state.page++;
        },
    },
});

const adapterSelectors = adapter.getSelectors<RootState>((state) => state[companiesName]);

const selectCompanyPage = (state: RootState) => state["companies"].page;

export const companiesSelectors = {
    ...adapterSelectors,
    selectCompanyPage,
    selectCompanies: createSelector(
        [selectCompanyPage, adapterSelectors.selectAll],
        (page, companies) => {
            return companies.slice(0, page * 10);
        }
    ),
};

export const companiesReducer = slice.reducer;
export const companiesActions = slice.actions;
