import express, { Application } from "express";

import { healthRouter , employeeRouter , employeetypeRouter } from "../routes";
import { errorHandler, logger, rules } from "../middlewares";

import database from "../config";

export class App {
    public app: Application;

    constructor()
    {
        this.app = express();

        // this.app.use(cors({
        //     credentials: true,
        // }));

        this.databaseSync();

        this.middlewares();

        this.app.use(rules);

        this.routes();

        this.app.use(errorHandler);
    }

    protected databaseSync():void
    {
        database.sequelize?.sync();
    }

    protected middlewares(): void
    {
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());
        
        this.app.use(logger);        
    }

    protected routes():void
    {
        this.app.use('/health', healthRouter);
        this.app.use('/employee', employeeRouter);
        this.app.use('/employeetype', employeetypeRouter);
    }
}
