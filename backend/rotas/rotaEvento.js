import Evento from '../modelo/evento.js';
import EventoDB from '../persistencia/eventoDB.js';

import express from 'express';

export const rotaEvento = express.Router();
rotaEvento.use(express.json());
rotaEvento.use(express.urlencoded({ extended: true }));

const eventoDB = new EventoDB();

rotaEvento.route('/:id?')
.get((req, resp) => {
    if (req.params.id){
        eventoDB.consultarEventoId(req.params.id).then(event=>{
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
        eventoDB.consultarEventoDescricao("").then(eventos=>{
            resp.statusCode=200;
            resp.setHeader('Content-Type','application/json');
            resp.json(eventos);
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
            const evento = new Evento(0,dados.nomeEvent,dados.descricao,
                                       dados.endereco);
            eventoDB.incluirEvento(evento).then((id)=>{
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
        const evento = new Evento(dados.id,dados.nomeEvent,dados.descricao,
                                   dados.endereco);
        eventoDB.atualizarEvento(evento).then((resultado)=>{
            resp.statusCode=200;
            resp.setHeader("Content-Type","application/json");
            resp.json(resultado);
        });
    }
})
.delete((req,resp) => {
    if (req.body){
        const dados = req.body;
        const evento = new Evento(dados.id,dados.nomeEvent,dados.descricao,
                                     dados.endereco);
            eventoDB.excluirEvento(evento).then((resultado)=>{
            resp.statusCode=200;
            resp.setHeader("Content-Type","application/json");
            resp.json(resultado);
        });
    }
})

