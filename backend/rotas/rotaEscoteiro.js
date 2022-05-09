import Escoteiro from '../modelo/escoteiro.js';
import EscoteiroDB from '../persistencia/escoteiroDB.js';

import express from 'express';

export const rotaEscoteiro = express.Router();
rotaEvento.use(express.json());
rotaEvento.use(express.urlencoded({ extended: true }));

const escoteiroDB = new EscoteiroDB();

rotaEscoteiro.route('/:id?')
.get((req, resp) => {
    if (req.params.id){
        escoteiroDB.consultarEscoteiroId(req.params.id).then(event=>{
            if (event){
                resp.statusCode=200;
                resp.setHeader('Content-Type','application/json');
                resp.json(event);
            }
            else{
                resp.statusCode=404;
                resp.setHeader('Content-Type','application/json');
                resp.json({});
            }    
        });
    }
    else{
        escoteiroDB.consultarEscoteiroNome("").then(escoteiros=>{
            resp.statusCode=200;
            resp.setHeader('Content-Type','application/json');
            resp.json(escoteiros);
        });
        
    }
})
.post((req, resp) =>{
    if(req.params.id){
        resp.end('Método Post não suportado utilizando o id ' + req.params.id);
    }
    else{
        const dados = req.body;
        if (dados){
            const escoteiro = new Escoteiro(0,dados.nome,dados.cpf,dados.registro,dados.telefone,dados.secao);
            escoteiroDB.incluirEscoteiro(escoteiro).then((id)=>{
                resp.statusCode=200;
                resp.setHeader("Content-Type","application/json");
                resp.json({"id":id});
            });                                       
        }
    }
})
.put((req, resp) => {
    if (req.body){
        const dados = req.body;
        const escoteiro = new Escoteiro(dados.id,dados.nome,dados.cpf,dados.registro,dados.telefone,dados.secao);
        escoteiroDB.atualizarEscoteiro(escoteiro).then((resultado)=>{
            resp.statusCode=200;
            resp.setHeader("Content-Type","application/json");
            resp.json(resultado);
        });
    }
})
.delete((req,resp) => {
    if (req.body){
        const dados = req.body;
        const escoteiro = new Escoteiro(dados.id,dados.nome,dados.cpf,dados.registro,dados.telefone,dados.secao);
            escoteiroDB.excluirEscoterio(escoteiro).then((resultado)=>{
            resp.statusCode=200;
            resp.setHeader("Content-Type","application/json");
            resp.json(resultado);
        });
    }
})

