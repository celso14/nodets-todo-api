import express, {Request, Response} from 'express';

const api = express();
const port = 5000;

//Endpoints
api.get('/', (req:Request, res:Response) => {
    res.send("Hello World!");
});




//Localhost PORT settings
api.listen(port, () => {
    console.log(`Running on Port ${port}`);
});