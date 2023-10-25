import { Pool } from "pg";
import * as dotenv from "dotenv";
dotenv.config();

class Database{
    public Pool: Pool | undefined;

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
        this.Pool = new Pool({
           database: this.POSTGRES_DB,
           user: this.POSTGRES_USER,
           password: this.POSTGRES_PASSWORD,
           host: this.POSTGRES_HOST,
           port: this.POSTGRES_PORT,           
        });

        await this.Pool.connect()
        .then(() => {
            console.log('database connected!');      
        })
        .catch((err) => {
            console.error('Unable to connect to database!', err);
                    
        })
    }
}

const database: Database = new Database();

export default database;