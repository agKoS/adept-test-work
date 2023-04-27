import { createAsyncThunk } from "@reduxjs/toolkit";
import { ISelectedCompany } from "@types-components/CompanyTable";

const common = "common";

/**
 * Добавление компании, если чекбокс в состоянии true
 */
export const selectCompanyThunk = createAsyncThunk<ISelectedCompany, ISelectedCompany>(
    `${common}/selectCompany`,
    (selectedCompany) => {
        return Promise.resolve(selectedCompany);
    }
);

/**
 * Удаление компании, если чекбокс в состоянии false
 */
export const removeCompanyThunk = createAsyncThunk<ISelectedCompany, ISelectedCompany>(
    `${common}/removeCompany`,
    (selectedCompany) => {
        return Promise.resolve(selectedCompany);
    }
);

/**
 * Выделить все комании в таблице
 */
export const selectAllCompaniesThunk = createAsyncThunk<ISelectedCompany[], ISelectedCompany[]>(
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
