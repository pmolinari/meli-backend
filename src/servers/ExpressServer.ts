import express, {Application, Request, Response, Errback, NextFunction} from 'express';
import itemsRoutes from '../routes/api/items.routes';
import errorHandler from '../middlewares/error-handler';

export class ExpressServer {
    app: Application;
    port: number;

    constructor() {
        this.app = express();
        this.port = Number(process.env.PORT);
        this.initMiddlewares();
        this.initRoutes();

    }

    initMiddlewares() {        
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));
        this.app.use(express.static('public'));
    }

    initRoutes() {
        this.app.use('/api', itemsRoutes);
        this.app.use(errorHandler);
    }

    listen() {
        console.log('Starting HTTP Server...')
        this.app.listen(this.port, () => {
            console.log('Server is running on port ' + this.port);
        
        })
    }

}
