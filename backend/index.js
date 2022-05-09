import express from 'express';

import http from 'http';
import cors from 'cors'

const hostname = 'localhost';
const porta = 4000;

const app = express();
app.use(cors({
    origin:"*"
}));

import {rotaProduto} from './rotas/rotaProduto.js';
import {rotaEvento} from './rotas/rotaEvento.js';
import {rotaEscoteiro} from './rotas/rotaEscoteiro.js';
app.use('/produtos', rotaProduto);
app.use('/eventos', rotaEvento);
app.use('/escoteiros', rotaEscoteiro);

const servidor = http.createServer(app);
servidor.listen(porta,hostname, ()=>{
    console.log('Servidor escutando em ' + hostname + ":" + porta);
});