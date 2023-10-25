import express, { Application } from "express";
import { healthRouter , employeeRouter , employeetypeRouter } from "./routes";
import { errorHandler, logger } from "./middlewares";
// import database from "./database/config";

class App {
    public app: Application;

    constructor()
    {
        this.app = express();

        // this.app.use(cors({
        //     credentials: true,
        // }));

        // this.app.use(compression());
        // this.app.use(cookieParser());
        // this.app.use(bodyParser.json());

        this.middlewares();
        this.routes();
        this.app.use(errorHandler);
    }

    // protected databaseSync():void
    // {
    //     database.Pool?.sync;
    // }

    protected middlewares(): void
    {
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

const app = new App();
const port: number = 3000;

// const server = http.createServer(this.app);

app.app.listen(port, () =>
{
    console.log(`Listening at http://localhost:${port}`);
}); 

