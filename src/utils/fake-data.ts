import { faker } from "@faker-js/faker";
import { ICompaniesTableRowData } from "@types-components/CompanyTable";
import { IEmployeesTableRowData } from "@types-components/EmployeesTable";

/**
 * Случайное целое число от 0 до maxNumber
 * Если передано отрицательное число, то возвращается 0
 *
 * @param maxNumber - максимальное значение
 */
const getRandomNumber = (maxNumber: number): number => {
    if (maxNumber < 0) {
        return 0;
    }
    const rand = Math.random() * (maxNumber + 1);
    return Math.floor(rand);
};

/**
 * Добавление сотрудников
 *
 * @param employeesArray - массив сотрудников
 * @param companyData - данные о компании
 */
const addEmployees = (
    employeesArray: IEmployeesTableRowData[],
    companyData: ICompaniesTableRowData
) => {
    const { companyName, numberEmployees } = companyData;

    for (let i = 0; i < numberEmployees; i++) {
        employeesArray.push({
            id: faker.datatype.uuid(),
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            position: faker.name.jobType(),
            companyName,
        });
    }
};

/**
 * Функция для формирования данных для приложения
 *
 * В параметре companiesCount мы указываем число компаний, которые мы хотим сгенерировать
 * В параметре maxEmployees мы указываем максимальное число, сотрудников, которые будут в компании.
 * Количество сотрудников будет от 0 до maxEmployees
 *
 *
 * @param companiesCount - число компаний
 * @param maxEmployees - максимальное число сотрудников в компании
 */
const createFakeData = (
    companiesCount: number,
    maxEmployees: number
): [ICompaniesTableRowData[], IEmployeesTableRowData[]] => {
    const companiesData: ICompaniesTableRowData[] = [];
    const employeesData: IEmployeesTableRowData[] = [];

    for (let i = 0; i < companiesCount; i++) {
        const companyData: ICompaniesTableRowData = {
            id: faker.datatype.uuid(),
            companyName: faker.company.name(),
            numberEmployees: getRandomNumber(maxEmployees),
            address: `${faker.address.streetAddress()}, ${faker.address.cityName()}, ${faker.address.country()}`,
        };

        companiesData.push(companyData);
        addEmployees(employeesData, companyData);
    }

    return [companiesData, employeesData];
};

const [companiesData, emplyeesData] = createFakeData(100, 20);

export { companiesData, emplyeesData };
