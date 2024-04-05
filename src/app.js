import  express  from "express";
import employeesRoutes from './routes/employees.routes.js';
import indexRouter from './routes/index.routes.js';
import {PORT} from './config.js';

const app = express();



//middlewares
app.use(express.json());
app.use(indexRouter);
app.use('/api/',employeesRoutes);
app.use((req,res,next) =>{
    res.status(404).json({
        message: 'endpoint not found'
    })
});

export default app;