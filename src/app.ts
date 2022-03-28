import express from 'express';
import helmet from 'helmet';
import itemsRoutes from './routes/api/items.routes';
import errorHandler from './middlewares/error-handler';

require('dotenv').config();
const port = process.env.PORT ? +process.env.PORT : 3000;

const app: express.Application = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.use('/api', itemsRoutes);
app.use(errorHandler);


app.listen(port, () => {
    console.log('Server is running on port ' + port);
});
