import { Model , DataTypes , Sequelize } from "sequelize";

import { employeeTypeRequestBody } from '../types/employeetype';

import database from "../config";

const sequelize = database.sequelize as Sequelize;

export class employeetypeModel extends Model<employeeTypeRequestBody>
{
    declare employeetypeid: number;
    declare description: string;
    declare situation: boolean;
}

employeetypeModel.init(
    {
        employeetypeid: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        situation: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    },
    {
        sequelize,
        timestamps: false,
        tableName: 'employeetype'
    }
);
