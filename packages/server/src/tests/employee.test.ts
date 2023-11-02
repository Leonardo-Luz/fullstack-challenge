import supertest from "supertest"
import { App } from "../utils/server"
import * as employeeService from "../service/employee.service";

import { employeeRequestBody } from "../types/employee";
import { employeetypeI } from "../models/employee";

const app = new App().app;

const employeePayLoad = {
    "employeeid": 123456,
    "name":"aaaaa",
    "cellnum": "999",
    "email":"exemple@gmail.com",
    "employeetypeid":12,
    "situation":true,
} as employeetypeI


const employeeInput = {
    "employeeid": 123456,
    "name":"aaaaa",
    "cellnum": "999",
    "email":"exemple@gmail.com",
    "employeetypeid":12,
    "situation":true,
} as employeeRequestBody

describe("employee", () => {
    it("start test", () => {
        expect(true).toBe(true);
    })
    describe("get employee route", () => {
        describe("given employee doesn't exist", () =>{
            it("should return status: 404", async() => {            
                const employeeid = 123;

                await supertest(app).get(`/employee/${employeeid}`)
                    .expect(404);
            })
        }) 

        describe("given employee does exist", () =>{
            it("should return status: 200 and employee", async() => {        
                const employeeid = 224;

                const { body , statusCode} = await supertest(app).get(`/employee/${employeeid}`)
                
                expect(statusCode).toBe(200);
                
                expect(body.employeeid).toBe(employeeid);
            });
        });
    })
    describe("post employee route", () => {
        describe("create wrong input employee", ()=> {
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
        describe("create employee", ()=> {
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
    describe("put employee route", () => {
        describe("update not found employee", () => {
            it("should return status: 404", async ()=> {
                const UpdateEmployeeService = jest.spyOn(employeeService, 'updateEmployee')
                //@ts-ignore
                .mockRejectedValueOnce("Oh no!");

                const { statusCode } = await supertest(app)
                    .put(`/employee/123456`)
                    .send(employeeInput);
                            
                expect(statusCode).toBe(404);                

                expect(UpdateEmployeeService).not.toHaveBeenCalled();
            })            
        })
        describe("update wrong input employee", () => {
            it("should return status: 500", async ()=> {
                const UpdateEmployeeService = jest.spyOn(employeeService, 'updateEmployee')
                //@ts-ignore
                .mockRejectedValueOnce("Oh no!");

                const { statusCode } = await supertest(app)
                    .put(`/employee/12345`)
                    .send(employeeInput);
                            
                
                expect(statusCode).toBe(500);
                
                expect(UpdateEmployeeService).toHaveBeenCalled();
            })
        })
        describe("update employee", () => {
            it("should return status: 200 and updated employee", async ()=> {
                const id = 12345

                const UpdateEmployeeService = jest.spyOn(employeeService, 'updateEmployee')
                //@ts-ignore
                .mockReturnValueOnce(employeePayLoad);

                const { body , statusCode } = await supertest(app)
                    .put(`/employee/${id}`)
                    .send(employeeInput);
                            
                
                expect(statusCode).toBe(200);
                
                expect(UpdateEmployeeService).toHaveBeenCalled();
            })
        })
    })
})