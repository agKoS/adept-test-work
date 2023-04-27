import {
    createEntityAdapter,
    createSelector,
    createSlice,
    type PayloadAction,
} from "@reduxjs/toolkit";
import type { ICompaniesTableRowData, ISelectedCompany } from "@types-components/CompanyTable";
import { companiesData } from "@utils/fake-data";
import { RootState } from "./store";
import {
    removeAllCompaniesThunk,
    removeCompanyThunk,
    selectAllCompaniesThunk,
    selectCompanyThunk,
} from "./thunks";

export interface ICompaniesSlice {
    page: number;
    selectedCompanies: ISelectedCompany[];
}

export const companiesName = "companies";

const initialState: ICompaniesSlice = {
    page: 1,
    selectedCompanies: [],
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
        addCompany: (state, action: PayloadAction<ICompaniesTableRowData>) => {
            adapter.addOne(state, action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(selectCompanyThunk.fulfilled, (state, action) => {
                state.selectedCompanies.push(action.payload);
            })
            .addCase(removeCompanyThunk.fulfilled, (state, action) => {
                state.selectedCompanies = state.selectedCompanies.filter(
                    (selectedCompany) => selectedCompany.id !== action.payload.id
                );
            })
            .addCase(selectAllCompaniesThunk.fulfilled, (state, action) => {
                state.selectedCompanies = action.payload;
            })
            .addCase(removeAllCompaniesThunk.fulfilled, (state) => {
                state.selectedCompanies.length = 0;
            });
    },
});

const adapterSelectors = adapter.getSelectors<RootState>((state) => state[companiesName]);

const selectCompanyPage = (state: RootState) => state["companies"].page;

const selectSelectedCompanies = (state: RootState) => state["companies"].selectedCompanies;

export const companiesSelectors = {
    ...adapterSelectors,
    selectCompanyPage,
    selectSelectedCompanies,
    selectCompanies: createSelector(
        [selectCompanyPage, adapterSelectors.selectAll],
        (page, companies) => {
            return companies.slice(0, page * 10);
        }
    ),
    selectSelectedCompaniesIds: createSelector(selectSelectedCompanies, (selectedCompanies) =>
        selectedCompanies.map((company) => company.id)
    ),
};

export const companiesReducer = slice.reducer;
export const companiesActions = slice.actions;
