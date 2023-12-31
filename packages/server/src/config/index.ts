import { Sequelize } from "sequelize";
import * as dotenv from "dotenv";
dotenv.config();

class Database{
    public sequelize: Sequelize | undefined;

    private POSTGRES_DB = process.env.POSTGRES_DB as string;
    private POSTGRES_HOST = process.env.POSTGRES_HOST as string;
    private POSTGRES_PORT = process.env.POSTGRES_PORT as unknown as number;
    private POSTGRES_USER = process.env.POSTGRES_USER as string;
    private POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD as unknown as string;

    constructor()
    {
        this.connectToPostegresSql();
    }

    private async connectToPostegresSql()
    {
        this.sequelize = new Sequelize({
           database: this.POSTGRES_DB,
           username: this.POSTGRES_USER,
           password: this.POSTGRES_PASSWORD,
           host: this.POSTGRES_HOST,
           port: this.POSTGRES_PORT,
           dialect: 'postgres',
           logging: true
        });

        await this.sequelize.authenticate()
        .then(() => {
            console.log('database connected!');      
        })
        .catch((err) => {
            console.error('Unable to connect to database!', err);
        })
    }
}

const database = new Database();

export default database;