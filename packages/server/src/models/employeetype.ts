import { Model , Sequelize, INTEGER, STRING, BOOLEAN, DATE, NOW } from "sequelize";

import { employeeTypeRequestBody } from '../types/employeetype';

import database from "../config";

import { employeeModel } from "./employee";

const sequelize = database.sequelize as Sequelize;

interface employeetypeI extends Model<employeeTypeRequestBody>,
employeeTypeRequestBody{}
 
export const employeetypeModel = sequelize.define<employeetypeI>(
    'employeetype',
    {
        employeetypeid: {
            primaryKey: true,
            type: INTEGER,
            unique: true,
        },
        description: {
            allowNull: false,
            type: STRING,
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

employeetypeModel.hasMany(employeeModel, {
    sourceKey: 'employeetypeid',
    foreignKey: 'employeetypeid',
    as: 'employees'
})

employeeModel.belongsTo(employeetypeModel, {
    foreignKey: 'employeetypeid',
    as: 'employeetype'
})