import { createAsyncThunk } from "@reduxjs/toolkit";
import { ISelectedCompanyId } from "@types-components/CompanyTable";

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
