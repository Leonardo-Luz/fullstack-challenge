import supertest from "supertest"

import { App } from "../utils/server"

import { employeetypeI } from "../models/employeetype";

import * as employeeTypeService from "../service/employeetype.service";

import { employeeTypeRequestBody } from "../types/employeetype";

const app = new App().app;

const employeetypePayLoad = { 
    employeetypeid: -99,
    description: "Admin",
    situation: true,
} as employeetypeI


const employeetypeInput = {
    employeetypeid: -99,
    description: "Admin",
    situation: true,
} as employeeTypeRequestBody

describe("employeetype", () => {

    beforeEach( () => {
        jest.restoreAllMocks();
        jest.clearAllMocks();
        jest.resetAllMocks();
    })

    describe("get employeetype route--", () => {
        describe("given employeetype doesn't exist", () =>{
            it("should return status: 404", async() => { 
                const employeetypeid = -9999;
                
                await supertest(app).get(`/employeetype/${employeetypeid}`)
                    .expect(404);
            })
        }) 

        describe("given employeetype does exist", () =>{
            it("should return status: 200 and employeetype", async() => {        
                const employeetypeid = 0;

                const { body , statusCode} = await supertest(app).get(`/employeetype/${employeetypeid}`)
                
                expect(statusCode).toBe(200);
                
                expect(body.employeetypeid).toBe(employeetypeid);

            });
        });
    })
    describe("post employeetype route--", () => {
        describe("given rejected input", ()=> {
            it("should return status: 500", async ()=> {
                const createemployeeTypeService = jest.spyOn(employeeTypeService, 'createEmployeeType')
                //@ts-ignore
                .mockRejectedValueOnce("Oh no!");

                const { statusCode } = await supertest(app)
                    .post('/employeetype')
                    .send(employeetypeInput);
                            
                
                expect(statusCode).toBe(500);
                
                expect(createemployeeTypeService).toHaveBeenCalled();
            })
        })
        describe("given right input", ()=> {
            it("should return status: 200 and employeetype", async ()=> {
                const createemployeeTypeService = jest.spyOn(employeeTypeService, 'createEmployeeType')
                //@ts-ignore
                .mockReturnValueOnce(employeetypePayLoad);

                const { body , statusCode } = await supertest(app)
                    .post('/employeetype')
                    .send(employeetypeInput);
                            
                
                expect(statusCode).toBe(200);
                
                expect(body.body.employeetype).toEqual(employeetypePayLoad);                                

                expect(createemployeeTypeService).toHaveReturnedWith(employeetypeInput);
            })
        })
    })
    describe("put employeetype route--", () => {
        describe("given employeetype doesn't exist", () => {
            it("should return status: 404", async ()=> {
                const UpdateemployeeTypeService = jest.spyOn(employeeTypeService, 'updateEmployeeType')
                //@ts-ignore
                .mockRejectedValueOnce("Oh no!");

                const { statusCode } = await supertest(app)
                    .put(`/employeetype/-9999`)
                    .send(employeetypeInput);
                            
                expect(statusCode).toBe(404);                

                expect(UpdateemployeeTypeService).not.toHaveBeenCalled();
            })            
        })
        describe("given rejected input", () => {
            it("should return status: 500", async ()=> {

                //create mock employeetype to update...

                const UpdateemployeeTypeService = jest.spyOn(employeeTypeService, 'updateEmployeeType')
                //@ts-ignore
                .mockRejectedValueOnce("Oh no!");

                const { statusCode } = await supertest(app)
                    .put(`/employeetype/0`)
                    .send(employeetypeInput);
                            
                
                expect(statusCode).toBe(500);
                
                expect(UpdateemployeeTypeService).toHaveBeenCalled();
            })
        })
        describe("given employeetype does exist and right input", () => { //error
            it("should return status: 200", async ()=> {

                //create mock employeetype to update...

                const UpdateemployeeTypeService = jest.spyOn(employeeTypeService, 'updateEmployeeType')
                //@ts-ignore
                .mockReturnValueOnce(employeetypePayLoad);

                const { statusCode } = await supertest(app)
                    .put(`/employeetype/0`)
                    .send({
                        description: "ADMIN",
                        situation: false
                    });
                                    
                expect( statusCode ).toBe(200);
                
                expect(UpdateemployeeTypeService).toHaveBeenCalled();

                //expect updatedAt to be updated ! || cellnum || name
            })
        })
    })
    describe("delete employeetype route--", () => {
        describe("given employeetype doesn't exist", () => {
            it("should return status: 404", async ()=> {

                const deleteemployeeTypeService = jest.spyOn(employeeTypeService, 'deleteEmployeeType')
                    //@ts-ignore
                    .mockReturnValueOnce();

                const { statusCode } = await supertest(app)
                    .delete(`/employeetype/-9999`)
                            
                expect(statusCode).toBe(404);

                expect(deleteemployeeTypeService).not.toHaveBeenCalled();
            })
        })    
        describe("given employeetype does exist", () => {
            it("should return status: 200", async ()=> {

                //create mock employeetype to delete

                const deleteemployeeTypeService = jest.spyOn(employeeTypeService, 'deleteEmployeeType')
                    //@ts-ignore
                    .mockReturnValueOnce();

                const { statusCode } = await supertest(app)
                    .delete(`/employeetype/0`)
                            
                expect(statusCode).toBe(200);                

                expect(deleteemployeeTypeService).toHaveBeenCalled();

                //expect mock to be deleted
            })
        })
    })
})