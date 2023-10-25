export type employeeRequestBody = {
    employeeid: number,
    name: string,
    cellnum: string | null,
    email: string | null,
    employeetypeid: number,
    situation: boolean,
};
