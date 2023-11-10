import supertest from "supertest"

import { App } from "../utils/server"

import { employeetypeI } from "../models/employee";

import * as employeeService from "../service/employee.service";

import { employeeRequestBody } from "../types/employee";

const app = new App().app;

const employeePayLoad = { 
    "employeeid": -99,
    "name":"aaaaa",
    "cellnum": "0",
    "email":"exemple@gmail.com",
    "employeetypeid":12,
    "situation":true,
} as employeetypeI


const employeeInput = {
    "employeeid": -99,
    "name":"aaaaa",
    "cellnum": "0",
    "email":"exemple@gmail.com",
    "employeetypeid":12,
    "situation":true,
} as employeeRequestBody

describe("employee", () => {

    beforeEach( () => {
        jest.restoreAllMocks();
        jest.clearAllMocks();
        jest.resetAllMocks();
    })

    describe("get employee route--", () => {
        describe("given employee doesn't exist", () =>{
            it("should return status: 404", async() => { 
                const employeeid = -999;
                
                await supertest(app).get(`/employee/${employeeid}`)
                    .expect(404);
            })
        }) 

        describe("given employee does exist", () =>{
            it("should return status: 200 and employee", async() => {        
                const employeeid = 0;

                const { body , statusCode} = await supertest(app).get(`/employee/${employeeid}`)
                
                expect(statusCode).toBe(200);
                
                expect(body.employeeid).toBe(employeeid);

            });
        });
    })
    describe("post employee route--", () => {
        describe("given rejected input", ()=> {
            it("should return status: 500", async ()=> {
                const createEmployeeService = jest.spyOn(employeeService, 'createEmployee')
                //@ts-ignore
                .mockRejectedValueOnce("Oh no!");

                const { statusCode } = await supertest(app)
                    .post('/employee')
                    .send(employeeInput);
                            
                
                expect(statusCode).toBe(500);
                
                expect(createEmployeeService).toHaveBeenCalled();
            })
        })
        describe("given right input", ()=> {
            it("should return status: 200 and employee", async ()=> {
                const createEmployeeService = jest.spyOn(employeeService, 'createEmployee')
                //@ts-ignore
                .mockReturnValueOnce(employeePayLoad);

                const { body , statusCode } = await supertest(app)
                    .post('/employee')
                    .send(employeeInput);
                            
                
                expect(statusCode).toBe(200);
                
                expect(body.body.employee).toEqual(employeePayLoad);                                

                expect(createEmployeeService).toHaveReturnedWith(employeeInput);
            })
        })
    })
    describe("put employee route--", () => {
        describe("given employee doesn't exist", () => {
            it("should return status: 404", async ()=> {
                const UpdateEmployeeService = jest.spyOn(employeeService, 'updateEmployee')
                //@ts-ignore
                .mockRejectedValueOnce("Oh no!");

                const { statusCode } = await supertest(app)
                    .put(`/employee/-999`)
                    .send(employeeInput);
                            
                expect(statusCode).toBe(404);                

                expect(UpdateEmployeeService).not.toHaveBeenCalled();
            })            
        })
        describe("given rejected input", () => {
            it("should return status: 500", async ()=> {

                //create mock employee to update...

                const UpdateEmployeeService = jest.spyOn(employeeService, 'updateEmployee')
                //@ts-ignore
                .mockRejectedValueOnce("Oh no!");

                const { statusCode } = await supertest(app)
                    .put(`/employee/0`)
                    .send(employeeInput);
                            
                
                expect(statusCode).toBe(500);
                
                expect(UpdateEmployeeService).toHaveBeenCalled();
            })
        })
        describe("given employee does exist and right input", () => { //error
            it("should return status: 200", async ()=> {

                //create mock employee to update...

                const UpdateEmployeeService = jest.spyOn(employeeService, 'updateEmployee')
                //@ts-ignore
                .mockReturnValueOnce(employeePayLoad);

                const { statusCode } = await supertest(app)
                    .put(`/employee/0`)
                    .send({
                        cellnum: "999333",
                        name: "teste"
                    });
                                    
                expect( statusCode ).toBe(200);
                
                expect(UpdateEmployeeService).toHaveBeenCalled();

                //expect updatedAt to be updated ! || cellnum || name
            })
        })
    })
    describe("delete employee route--", () => {
        describe("given employee doesn't exist", () => {
            it("should return status: 404", async ()=> {

                const deleteEmployeeService = jest.spyOn(employeeService, 'deleteEmployee')
                    //@ts-ignore
                    .mockReturnValueOnce();

                const { statusCode } = await supertest(app)
                    .delete(`/employee/-999`)
                            
                expect(statusCode).toBe(404);

                expect(deleteEmployeeService).not.toHaveBeenCalled();
            })
        })    
        describe("given employee does exist", () => {
            it("should return status: 200", async ()=> {

                //create mock employee to delete

                const deleteEmployeeService = jest.spyOn(employeeService, 'deleteEmployee')
                    //@ts-ignore
                    .mockReturnValueOnce();

                const { statusCode } = await supertest(app)
                    .delete(`/employee/0`)
                            
                expect(statusCode).toBe(200);                

                expect(deleteEmployeeService).toHaveBeenCalled();

                //expect mock to be deleted
            })
        })
    })
})