import { Model , DataTypes , Sequelize , ForeignKey } from "sequelize";

import { employeeRequestBody } from '../types/employee';

import database from "../config";
import { employeetypeModel } from "./employeetype";

const sequelize = database.sequelize as Sequelize;

export class employeeModel extends Model<employeeRequestBody>
{
    declare employeeid: number;
    declare name: string;
    declare cellnum: string | null;
    declare email: string | null;
    declare employeetypeid: ForeignKey<employeetypeModel['employeetypeid']>;
    declare situation: boolean;
}

employeeModel.init(
    {
        employeeid: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cellnum: DataTypes.BOOLEAN,
        email: DataTypes.STRING,
        employeetypeid: {
            type: DataTypes.INTEGER,
        },
        situation: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        }
    },
    {
        sequelize,
        timestamps: false,
        tableName: 'employee'
    }
);
