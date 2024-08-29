require('dotenv').config();
const connectDB = require('./config/database');
const express = require('express');
const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const cors = require('cors');

const app = express();

connectDB();

app.use(cors());
app.use(express.json()); 
app.use('/api', routes);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
