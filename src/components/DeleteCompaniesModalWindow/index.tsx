import { IButtonProps } from "@types-ui/Button";
import ButtonGroup from "@ui/ButtonGroup";
import ModalWindow from "@ui/ModalWindow";
import { Dispatch, SetStateAction, useCallback } from "react";
import { employeesSelectors } from "state/employeesSlice";
import { useAppDispatch, useAppSelector } from "state/hooks";
import { deleteCompaniesThunk } from "state/thunks";

interface IDeleteCompaniesModalWindowProps {
    setShowModal: Dispatch<SetStateAction<boolean>>;
}
export default function DeleteCompaniesModalWindow({
    setShowModal,
}: IDeleteCompaniesModalWindowProps) {
    const dispatch = useAppDispatch();

    const { employeeIdsForSelectedCompanies, selectedCompanyIds } = useAppSelector((state) => ({
        employeeIdsForSelectedCompanies:
            employeesSelectors.selectEmployeesForSelectedCompanies(state),
        selectedCompanyIds: employeesSelectors.selectSelectedCompanyIds(state),
    }));

    const deleteCompaniesHandler = () => {
        dispatch(
            deleteCompaniesThunk({
                companyIds: selectedCompanyIds,
                employeeIds: employeeIdsForSelectedCompanies,
            })
        );
        setShowModal(false);
    };

    const closeModalWindow = useCallback(() => {
        setShowModal(false);
    }, [setShowModal]);

    const buttonsSettings: IButtonProps[] = [
        {
            label: "ОК",
            clickCallback: deleteCompaniesHandler,
        },
        {
            label: "Отмена",
            clickCallback: closeModalWindow,
        },
    ];

    return (
        <ModalWindow closeModalWindow={closeModalWindow}>
            <div style={{ width: 500 }}>
                <p>Число удаляемых компаний: {selectedCompanyIds.length}</p>
                <p>ВНИМАНИЕ! Данное действие приведет также к удалению данных о сотрудниках</p>
                <div>
                    <ButtonGroup settings={buttonsSettings} />
                </div>
            </div>
        </ModalWindow>
    );
}
