import http from 'node:http';

import { App } from './utils/server';

const app = new App();

const port: number = 3001;

const server = http.createServer(app.app);


server.listen(port, () =>
{
    console.log(`Listening at http://localhost:${port}`);

}); 

