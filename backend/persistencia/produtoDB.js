import {MongoClient, ObjectId} from 'mongodb';
import Produto from '../modelo/produto.js';

const uri = "mongodb://localhost:27017";
const basedados = "BaseDB";
const colecao = "Produtos";

export default class ProdutoDB{
    constructor(){
        this.cliente = new MongoClient(uri);
    }

    async incluirProduto(produto){
        if (produto instanceof Produto){
            try{
                await this.cliente.connect();
                const resultado = await this.cliente.db(basedados)
                .collection(colecao).insertOne({"nomeProd": produto.nomeProd ,"descricao":produto.descricao,
                                                "precoCusto":produto.precoCusto,
                                                "precoVenda":produto.precoVenda,"qtdEstoque":produto.qtdEstoque});
                produto.id = resultado.insertedId.toString();
                return resultado.insertedId.toString();
            }catch(e){
                console.error(e);
            }
            finally{
                this.cliente.close();
            }
        }
    }

    async consultarProdutoId(id){
        try{
            const objId = new ObjectId(id);
            await this.cliente.connect();
            const resultado = await this.cliente.db(basedados).collection(colecao)
            .findOne({"_id":objId});
            if (resultado){
                const prod = new Produto(resultado._id,resultado.nomeProd,resultado.descricao,
                                        resultado.precoCusto,
                                        resultado.precoVenda, resultado.qtdEstoque);
                return prod;
            }

        }catch(e){
            console.error(e);
        }
        finally{
            this.cliente.close();
        }       
    }

    async consultarProdutoDescricao(desc){
        try{
            await this.cliente.connect();
            const cursor = this.cliente.db(basedados).collection(colecao)
            .find({"descricao":{"$regex":desc}});
            const resultados = await cursor.toArray();
            let listaProdutos = [];
            if (resultados){
                resultados.forEach(resultado => {
                    const prod = new Produto(resultado._id,resultado.nomeProd,resultado.descricao,
                        resultado.precoCusto,
                        resultado.precoVenda, resultado.qtdEstoque);
                    listaProdutos.push(prod);
                });
                return listaProdutos;
            }

        }catch(e){
            console.error(e);
        }
        finally{
            this.cliente.close();
        }       
    }

    async atualizarProduto(produto){
        if (produto instanceof Produto){
            try{
                await this.cliente.connect();
                const objId = new ObjectId(produto.id);
                const resultado = await this.cliente.db(basedados)                                                
                .collection(colecao).updateOne({"_id":objId},{"$set":produto.toJSON()});    
                if(resultado.modifiedCount > 0){
                    return {
                        "resultado":true
                    }
                } 
                else{
                    return {
                        "resultado":false
                    }
                }
            }
            catch(e){
                console.error(e);
            }
            finally{
                this.cliente.close();
            }
        }
    }

    async excluirProduto(produto){
        if (produto instanceof Produto){
            try{
                await this.cliente.connect();
                const objId = new ObjectId(produto.id);
                const resultado = await this.cliente.db(basedados)                                                
                .collection(colecao).deleteOne({"_id":objId});    
                if(resultado.deletedCount > 0){
                    return {
                        "resultado":true
                    }
                } 
                else{
                    return {
                        "resultado":false
                    }
                }
            }
            catch(e){
                console.error(e);
            }
            finally{
                this.cliente.close();
            }
        }
    }

}