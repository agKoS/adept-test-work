import { createAsyncThunk } from "@reduxjs/toolkit";
import { ISelectedCompanyId } from "@types-components/CompanyTable";
import { ISelectedEmployeeId } from "@types-components/EmployeesTable";

const common = "common";

/**
 * Добавление компании, если чекбокс в состоянии true
 */
export const selectCompanyThunk = createAsyncThunk<ISelectedCompanyId, ISelectedCompanyId>(
    `${common}/selectCompany`,
    (selectedCompany) => {
        return Promise.resolve(selectedCompany);
    }
);

/**
 * Удаление компании, если чекбокс в состоянии false
 */
export const removeCompanyThunk = createAsyncThunk<ISelectedCompanyId, ISelectedCompanyId>(
    `${common}/removeCompany`,
    (selectedCompany) => {
        return Promise.resolve(selectedCompany);
    }
);

/**
 * Выделить все комании в таблице
 */
export const selectAllCompaniesThunk = createAsyncThunk<ISelectedCompanyId[], ISelectedCompanyId[]>(
    `${common}/selectAllCompanies`,
    (selectedCompanies) => {
        return Promise.resolve(selectedCompanies);
    }
);

/**
 * Снять выделение со всех компаний в таблице
 */
export const removeAllCompaniesThunk = createAsyncThunk(`${common}/removeAllCompanies`, () => {
    return Promise.resolve();
});

/**
 * Добавление сотрудника, если чекбокс в состоянии true
 */
export const selectEmployeeThunk = createAsyncThunk<ISelectedEmployeeId, ISelectedEmployeeId>(
    `${common}/selectEmployee`,
    (selectedEmployee) => {
        return Promise.resolve(selectedEmployee);
    }
);

/**
 * Удаление компании, если чекбокс в состоянии false
 */
export const removeEmployeeThunk = createAsyncThunk<ISelectedEmployeeId, ISelectedEmployeeId>(
    `${common}/removeEmployee`,
    (selectedEmployee) => {
        return Promise.resolve(selectedEmployee);
    }
);

/**
 * Выделить всех сотрудников в таблице
 */
export const selectAllEmployeesThunk = createAsyncThunk<
    ISelectedEmployeeId[],
    ISelectedEmployeeId[]
>(`${common}/selectAllEmployees`, (selectedEmployees) => {
    return Promise.resolve(selectedEmployees);
});

/**
 * Снять выделение со всех сотрудников в таблице
 */
export const removeAllEmployeesThunk = createAsyncThunk(`${common}/removeAllEmployees`, () => {
    return Promise.resolve();
});
