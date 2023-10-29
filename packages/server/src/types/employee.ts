export type employeeRequestBody = {
    employeeid: number,
    name: string,
    cellnum: string | null,
    email: string | null,
    employeetypeid: number,
    situation: boolean,
    createdAt: Date | null,
    updatedAt: Date | null,    
};
 