import { Model , Sequelize, INTEGER, STRING, BOOLEAN, DATE, NOW } from "sequelize";

import { employeeRequestBody } from '../types/employee';

import database from "../config";

const sequelize = database.sequelize as Sequelize;

export interface employeetypeI extends Model<employeeRequestBody>,
employeeRequestBody{}

export const employeeModel = sequelize.define<employeetypeI>(
    'employee',
    {
        employeeid: {
            primaryKey: true,
            type: INTEGER,
            unique: true,
        },
        name: {
            allowNull: false,
            type: STRING,
        },
        cellnum: {
            allowNull: true,
            type: STRING,
        },
        email: {
            allowNull: true,
            type: STRING,
        },
        employeetypeid: {
            allowNull: false,
            type: INTEGER,
        },                
        situation: {
            allowNull: false,
            type: BOOLEAN,
        },
        createdAt: {
            allowNull: true,
            type: DATE,
            defaultValue: NOW(),
        },
        updatedAt: {
            allowNull: true,
            type: DATE,
            defaultValue: NOW(),
        },
    }
)
