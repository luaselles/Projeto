import Produto from '../modelo/produto.js';
import ProdutoDB from '../persistencia/produtoDB.js';

import express from 'express';

export const rotaProduto = express.Router();
rotaProduto.use(express.json());
rotaProduto.use(express.urlencoded({ extended: true }));

const produtoDB = new ProdutoDB();

rotaProduto.route('/:id?')
.get((req, resp) => {
    if (req.params.id){
        produtoDB.consultarProdutoId(req.params.id).then(prod=>{
            if (prod){
                resp.statusCode=200;
                resp.setHeader('Content-Type','application/json');
                resp.json(prod);
            }
            else{
                resp.statusCode=404;
                resp.setHeader('Content-Type','application/json');
                resp.json({});
            }    
        });
    }
    else{
        produtoDB.consultarProdutoDescricao("").then(produtos=>{
            resp.statusCode=200;
            resp.setHeader('Content-Type','application/json');
            resp.json(produtos);
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
            const produto = new Produto(0,dados.nomeProd,dados.descricao,
                                       dados.precoCusto,dados.precoVenda,dados.qtdEstoque);
            produtoDB.incluirProduto(produto).then((id)=>{
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
        const produto = new Produto(dados.id,dados.nomeProd,dados.descricao,
                                    dados.precoCusto,
                                    dados.precoVenda, dados.qtdEstoque);
        produtoDB.atualizarProduto(produto).then((resultado)=>{
            resp.statusCode=200;
            resp.setHeader("Content-Type","application/json");
            resp.json(resultado);
        });
    }
})
.delete((req,resp) => {
    if (req.body){
        const dados = req.body;
        const produto = new Produto(dados.id,dados.nomeProd,dados.descricao,
                                    dados.precoCusto,
                                    dados.precoVenda,dados.qtdEstoque);
        produtoDB.excluirProduto(produto).then((resultado)=>{
            resp.statusCode=200;
            resp.setHeader("Content-Type","application/json");
            resp.json(resultado);
        });
    }
})

