import {
    createEntityAdapter,
    createSelector,
    createSlice,
    type PayloadAction,
} from "@reduxjs/toolkit";
import type { ICompaniesTableRowData, ISelectedCompanyId } from "@types-components/CompanyTable";
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
    selectedCompanyIds: ISelectedCompanyId[];
}

export const companiesName = "companies";

const initialState: ICompaniesSlice = {
    page: 1,
    selectedCompanyIds: [],
};

const adapter = createEntityAdapter<ICompaniesTableRowData>({
    selectId: (item) => item.id,
    sortComparer: (a, b) => a.id.localeCompare(b.id),
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
                state.selectedCompanyIds.push(action.payload);
            })
            .addCase(removeCompanyThunk.fulfilled, (state, action) => {
                state.selectedCompanyIds = state.selectedCompanyIds.filter(
                    (selectedCompany) => selectedCompany !== action.payload
                );
            })
            .addCase(selectAllCompaniesThunk.fulfilled, (state, action) => {
                state.selectedCompanyIds = action.payload;
            })
            .addCase(removeAllCompaniesThunk.fulfilled, (state) => {
                state.selectedCompanyIds.length = 0;
            });
    },
});

const adapterSelectors = adapter.getSelectors<RootState>((state) => state[companiesName]);

const selectCompanyPage = (state: RootState) => state[companiesName].page;

export const companiesSelectors = {
    ...adapterSelectors,
    selectCompanyPage,
    selectSelectedCompanyIds: (state: RootState) => state[companiesName].selectedCompanyIds,
    selectCompanies: createSelector(
        [selectCompanyPage, adapterSelectors.selectAll],
        (page, companies) => {
            return companies.slice(0, page * 10);
        }
    ),
};

export const companiesReducer = slice.reducer;
export const companiesActions = slice.actions;
