import { createEntityAdapter, createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { employeesData } from "@utils/fake-data";
import { ISelectedCompanyId } from "@types-components/CompanyTable";
import { IEmployeesTableRowData, ISelectedEmployeeId } from "@types-components/EmployeesTable";
import { RootState } from "./store";
import {
    addNewEmployeeThunk,
    deleteCompaniesThunk,
    deletEmployeesThunk,
    removeAllCompaniesThunk,
    removeAllEmployeesThunk,
    removeCompanyThunk,
    removeEmployeeThunk,
    selectAllCompaniesThunk,
    selectAllEmployeesThunk,
    selectCompanyThunk,
    selectEmployeeThunk,
} from "./thunks";

export interface IEmployeesSlice {
    page: number;
    selectedCompanyIds: ISelectedCompanyId[];
    selectedEmployeeIds: ISelectedEmployeeId[];
}

export const employeesName = "employees";

const initialState: IEmployeesSlice = {
    page: 1,
    selectedCompanyIds: [],
    selectedEmployeeIds: [],
};

const adapter = createEntityAdapter<IEmployeesTableRowData>({
    selectId: (item) => item.id,
    sortComparer: (a, b) => a.companyId.localeCompare(b.companyId),
});

const slice = createSlice({
    name: employeesName,
    initialState: adapter.getInitialState<IEmployeesSlice>(initialState),
    reducers: {
        initState: (state) => {
            adapter.setAll(state, employeesData);
        },
        incrementPage: (state) => {
            state.page++;
        },
        addEmployee: (state, action: PayloadAction<IEmployeesTableRowData>) => {
            adapter.addOne(state, action.payload);
        },
        updateCell: (state, action: PayloadAction<any>) => {
            adapter.updateOne(state, action.payload);
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
            })
            .addCase(selectEmployeeThunk.fulfilled, (state, action) => {
                state.selectedEmployeeIds.push(action.payload);
            })
            .addCase(removeEmployeeThunk.fulfilled, (state, action) => {
                state.selectedEmployeeIds = state.selectedEmployeeIds.filter(
                    (selectedEmployeeId) => selectedEmployeeId !== action.payload
                );
            })
            .addCase(selectAllEmployeesThunk.fulfilled, (state, action) => {
                state.selectedEmployeeIds = action.payload;
            })
            .addCase(removeAllEmployeesThunk.fulfilled, (state) => {
                state.selectedEmployeeIds.length = 0;
            })
            .addCase(addNewEmployeeThunk.fulfilled, (state, action) => {
                const { newEmployee } = action.payload;
                adapter.addOne(state, newEmployee);
            })
            .addCase(deleteCompaniesThunk.fulfilled, (state, action) => {
                const { companyIds, employeeIds } = action.payload;

                state.selectedCompanyIds = state.selectedCompanyIds.filter(
                    (companyId) => !companyIds.includes(companyId)
                );

                state.selectedEmployeeIds = state.selectedEmployeeIds.filter(
                    (employeeId) => !employeeIds.includes(employeeId)
                );

                adapter.removeMany(state, employeeIds);
            })
            .addCase(deletEmployeesThunk.fulfilled, (state, action) => {
                const { selectedEmployeeIds } = action.payload;
                state.selectedEmployeeIds.length = 0;
                adapter.removeMany(state, selectedEmployeeIds);
            });
    },
});

const adapterSelectors = adapter.getSelectors<RootState>((state) => state[employeesName]);

const selectEmployeePage = (state: RootState) => state[employeesName].page;
const selectSelectedCompanyIds = (state: RootState) => state[employeesName].selectedCompanyIds;
const selectSelectedEmployeeIds = (state: RootState) => state[employeesName].selectedEmployeeIds;

export const employeesSelectors = {
    ...adapterSelectors,
    selectEmployeePage,
    //* Выбираем ID выбранных сотрудников
    selectSelectedEmployeeIds,
    //* Выбираем выбранных сотрудников
    selectSelectedEmployees: createSelector(
        [selectSelectedEmployeeIds, adapterSelectors.selectAll],
        (employeeIds, employees) => {
            return employees.filter((employee) => employeeIds.includes(employee.id));
        }
    ),
    //* Выбираем ID выбранных компаний
    selectSelectedCompanyIds,
    //* Выбираем сотрудников выбранных компаний для отображения в таблице
    selectEmployees: createSelector(
        [selectEmployeePage, selectSelectedCompanyIds, adapterSelectors.selectAll],
        (page, selectedCompanyIds, employees) => {
            return employees
                .filter((employee) => selectedCompanyIds.includes(employee.companyId))
                .slice(0, page * 15);
        }
    ),
    //* Выбираем ID всех сотрудников выбранных компаний
    selectEmployeesForSelectedCompanies: createSelector(
        [adapterSelectors.selectAll, selectSelectedCompanyIds],
        (employees, companyIds) => {
            return employees
                .filter((employee) => companyIds.includes(employee.companyId))
                .map((employee) => employee.id);
        }
    ),
};

export const employeesReducer = slice.reducer;
export const employeesActions = slice.actions;
