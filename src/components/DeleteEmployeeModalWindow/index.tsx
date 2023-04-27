import { ICompaniesTableRowData } from "@types-components/CompanyTable";
import { IButtonProps } from "@types-ui/Button";
import ButtonGroup from "@ui/ButtonGroup";
import ModalWindow from "@ui/ModalWindow";
import { Dispatch, SetStateAction, useCallback, useMemo } from "react";
import { companiesSelectors } from "state/companiesSlice";
import { employeesSelectors } from "state/employeesSlice";
import { useAppDispatch, useAppSelector } from "state/hooks";
import { deletEmployeesThunk } from "state/thunks";

interface IDeleteCompaniesModalWindowProps {
    setShowModal: Dispatch<SetStateAction<boolean>>;
}

export default function DeleteEmployeeModalWindow({
    setShowModal,
}: IDeleteCompaniesModalWindowProps) {
    const dispatch = useAppDispatch();

    const { selectedEmployees, selectedCompanies, selectedEmployeeIds } = useAppSelector(
        (state) => ({
            selectedEmployeeIds: employeesSelectors.selectSelectedEmployeeIds(state),
            selectedEmployees: employeesSelectors.selectSelectedEmployees(state),
            selectedCompanies: companiesSelectors.selectSelectedCompanies(state),
        })
    );

    /**
     * Количество удаляемых сотрудников для каждой компании
     */
    const companyDeleteInfo = useMemo(() => {
        const result: { [key: string]: number } = {};

        for (let employee of selectedEmployees) {
            const { companyId } = employee;
            if (companyId in result) {
                result[companyId]++;
            } else {
                result[companyId] = 1;
            }
        }

        return result;
    }, [selectedEmployees]);

    /**
     * Данные для апдейте таблицы с компаниями
     */
    const entitiesCompany = useMemo(() => {
        const companies: ICompaniesTableRowData[] = [];
        for (let [key, value] of Object.entries(companyDeleteInfo)) {
            const company = { ...selectedCompanies.find((item) => item.id === key)! };

            company.numberEmployees -= value;
            companies.push(company);
        }
        return companies;
    }, [companyDeleteInfo, selectedCompanies]);

    const closeModalWindow = useCallback(() => {
        setShowModal(false);
    }, [setShowModal]);

    const deleteEmployeesHandler = () => {
        dispatch(
            deletEmployeesThunk({
                companies: entitiesCompany,
                selectedEmployeeIds,
            })
        );
        setShowModal(false);
    };

    const buttonsSettings: IButtonProps[] = [
        {
            label: "ОК",
            clickCallback: deleteEmployeesHandler,
        },
        {
            label: "Отмена",
            clickCallback: closeModalWindow,
        },
    ];

    return (
        <ModalWindow closeModalWindow={closeModalWindow}>
            <div style={{ width: 500 }}>
                <p>Будет удалено {selectedEmployeeIds.length} сотрудников</p>
                <p>ВНИМАНИЕ! Данное действие необратимо</p>
                <div>
                    <ButtonGroup settings={buttonsSettings} />
                </div>
            </div>
        </ModalWindow>
    );
}
