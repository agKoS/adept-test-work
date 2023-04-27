import { useCallback, useMemo, useState } from "react";
import Table from "@components/Table";
import { useScrollUpdate } from "@hooks/use-scroll-update";
import type { ICompaniesTableRowData, ISelectedCompanyId } from "@types-components/CompanyTable";
import { ITableSettings } from "@types-components/Table";
import { companiesActions, companiesSelectors } from "state/companiesSlice";
import { useAppDispatch, useAppSelector } from "state/hooks";
import settings from "./settings.json";
import { createPortal } from "react-dom";
import AddCompanyModalWindow from "@components/AddCompanyModalWindow";
import {
    removeAllCompaniesThunk,
    removeCompanyThunk,
    selectAllCompaniesThunk,
    selectCompanyThunk,
} from "state/thunks";
import DeleteCompaniesModalWindow from "@components/DeleteCompaniesModalWindow";

/**
 * Таблица с компаниями
 */
export default function CompaniesTable() {
    const dispatch = useAppDispatch();

    const { companiesData, totalCount, selectedCompaniesIds } = useAppSelector((state) => ({
        companiesData: companiesSelectors.selectCompanies(state),
        totalCount: companiesSelectors.selectTotal(state),
        selectedCompaniesIds: companiesSelectors.selectSelectedCompanyIds(state),
    }));

    const [showAddModal, setShowAddModal] = useState<boolean>(false);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

    const tableSettings = settings as ITableSettings<ICompaniesTableRowData>;

    const needUpdateData = useMemo(() => {
        return companiesData.length < totalCount;
    }, [companiesData, totalCount]);

    const scrollCallback = useScrollUpdate(needUpdateData, companiesActions.incrementPage);

    const checkboxClickEventDelegation = (event: Event) => {
        const checkbox = event.target as HTMLInputElement;
        const { dataset, checked } = checkbox;

        if ("id" in dataset && checkbox.type === "checkbox") {
            const companyId: ISelectedCompanyId = dataset["id"] as string;

            if (checked) {
                dispatch(selectCompanyThunk(companyId));
            } else {
                dispatch(removeCompanyThunk(companyId));
            }
        }
    };

    const selectAllCheckboxesCallback = useCallback(() => {
        if (selectedCompaniesIds.length < companiesData.length) {
            const selectedCompanies: ISelectedCompanyId[] = companiesData.map(
                (company) => company.id
            );
            dispatch(selectAllCompaniesThunk(selectedCompanies));
        } else {
            dispatch(removeAllCompaniesThunk());
        }
    }, [selectedCompaniesIds, companiesData, dispatch]);

    return (
        <>
            <Table<ICompaniesTableRowData>
                settings={tableSettings}
                tableData={companiesData}
                scrollCallback={scrollCallback}
                setShowAddModal={setShowAddModal}
                setShowDeleteModal={setShowDeleteModal}
                checkboxClickEventDelegation={checkboxClickEventDelegation}
                selectedRows={selectedCompaniesIds}
                selectAllCheckboxesCallback={selectAllCheckboxesCallback}
            />
            {showAddModal &&
                createPortal(
                    <AddCompanyModalWindow setShowModal={setShowAddModal} />,
                    document.body
                )}
            {showDeleteModal &&
                createPortal(
                    <DeleteCompaniesModalWindow setShowModal={setShowDeleteModal} />,
                    document.body
                )}
        </>
    );
}
