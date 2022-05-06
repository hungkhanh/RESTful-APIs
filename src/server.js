import express from 'express';
import cors from 'cors';

const app = express();

var corOptions = {
    origin: 'https://localhost:8081',
}

// middleware
app.use(cors(corOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routers
import customersRouter from './routes/customersRouter';
import employeesRouter from './routes/employeesRouter';

app.use('/customers', customersRouter);
app.use('/employees', employeesRouter);

// test api
app.get('/', (req, res) => {
    res.json({ message: 'hello from api'});
});

// port
const PORT = process.env.PORT || 8080;

// server
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});