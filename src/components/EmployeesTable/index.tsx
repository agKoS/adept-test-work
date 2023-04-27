import AddEmployeeModalWindow from "@components/AddEmployeeModalWindow";
import Table from "@components/Table";
import { useScrollUpdate } from "@hooks/use-scroll-update";
import { IEmployeesTableRowData, ISelectedEmployeeId } from "@types-components/EmployeesTable";
import { ITableSettings } from "@types-components/Table";
import { useCallback, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { employeesActions, employeesSelectors } from "state/employeesSlice";
import { useAppDispatch, useAppSelector } from "state/hooks";
import {
    removeAllEmployeesThunk,
    removeEmployeeThunk,
    selectAllEmployeesThunk,
    selectEmployeeThunk,
} from "state/thunks";
import settings from "./settings.json";

export default function EmployeeTable() {
    const dispatch = useAppDispatch();

    const tableSettings = settings as ITableSettings<IEmployeesTableRowData>;

    const { employeesData, totalCount, selectedEmployeesIds, selectedCompaniesIds } =
        useAppSelector((state) => ({
            employeesData: employeesSelectors.selectEmployees(state),
            totalCount: employeesSelectors.selectTotal(state),
            selectedCompaniesIds: employeesSelectors.selectSelectedCompanyIds(state),
            selectedEmployeesIds: employeesSelectors.selectSelectedEmployeeIds(state),
        }));

    const [showModal, setShowModal] = useState<boolean>(false);

    const needUpdateData = useMemo(() => {
        return employeesData.length < totalCount;
    }, [employeesData, totalCount]);

    const scrollCallback = useScrollUpdate(needUpdateData, employeesActions.incrementPage);

    const checkboxClickEventDelegation = (event: Event) => {
        const checkbox = event.target as HTMLInputElement;
        const { dataset, checked } = checkbox;

        if ("id" in dataset && checkbox.type === "checkbox") {
            const employeeId: ISelectedEmployeeId = dataset["id"] as string;

            if (checked) {
                dispatch(selectEmployeeThunk(employeeId));
            } else {
                dispatch(removeEmployeeThunk(employeeId));
            }
        }
    };

    const selectAllCheckboxesCallback = useCallback(() => {
        if (selectedEmployeesIds.length < employeesData.length) {
            const selectedEmployeeIds: ISelectedEmployeeId[] = employeesData.map(
                (employee) => employee.id
            );
            dispatch(selectAllEmployeesThunk(selectedEmployeeIds));
        } else {
            dispatch(removeAllEmployeesThunk());
        }
    }, [selectedEmployeesIds, employeesData, dispatch]);

    return (
        <>
            {selectedCompaniesIds.length > 0 ? (
                <>
                    <Table<IEmployeesTableRowData>
                        settings={tableSettings}
                        tableData={employeesData}
                        scrollCallback={scrollCallback}
                        setShowModal={setShowModal}
                        checkboxClickEventDelegation={checkboxClickEventDelegation}
                        selectedRows={selectedEmployeesIds}
                        selectAllCheckboxesCallback={selectAllCheckboxesCallback}
                    />
                    {showModal &&
                        createPortal(
                            <AddEmployeeModalWindow setShowModal={setShowModal} />,
                            document.body
                        )}
                </>
            ) : null}
        </>
    );
}
