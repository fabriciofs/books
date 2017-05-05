import express from 'express';
import bodyParser from 'body-parser';
import config from './app/config/config';
import datasource from './app/config/datasource';
import booksRouter from './app/routes/books';
import usersRouter from './app/routes/users';
import authRouter from './app/routes/auth';
import authorization from './auth';


const app = express();
app.config = config;
app.datasource = datasource(app);
app.set('port', process.env.PORT || 7000);
app.use(bodyParser.json());
const auth = authorization(app);

app.use(auth.initialize());
app.auth = auth;

booksRouter(app);
usersRouter(app);
authRouter(app);


export default app;
