import {MongoClient, ObjectId} from 'mongodb';
import Escoteiro from '../modelo/escoteiro.js';

const uri = "mongodb://localhost:27017";
const basedados = "BaseDB";
const colecao = "Escoteiros";

export default class EscoteiroDB{
    constructor(){
        this.cliente = new MongoClient(uri);
    }

    async incluirEscoteiro(escoteiro){
        if (escoteiro instanceof Escoteiro){
            try{
                await this.cliente.connect();
                const resultado = await this.cliente.db(basedados)
                .collection(colecao).insertOne({"nome": escoteiro.nome, "cpf":escoteiro.cpf,
                                                "registro":escoteiro.registro, "telefone":escoteiro.telefone, "secao":escoteiro.secao});
                escoteiro.id = resultado.insertedId.toString();
                return resultado.insertedId.toString();
            }catch(e){
                console.error(e);
            }
            finally{
                this.cliente.close();
            }
        }
    }

    async consultarEscoteiroId(id){
        try{
            const objId = new ObjectId(id);
            await this.cliente.connect();
            const resultado = await this.cliente.db(basedados).collection(colecao)
            .findOne({"_id":objId});
            if (resultado){
                const escoteiro = new Escoteiro(resultado.id,resultado.nome,resultado.cpf,resultado.registro,resultado.telefone,resultado.secao);
                return escoteiro;
            }

        }catch(e){
            console.error(e);
        }
        finally{
            this.cliente.close();
        }       
    }

    async consultarEscoteiroNome(nome){
        try{
            await this.cliente.connect();
            const cursor = this.cliente.db(basedados).collection(colecao)
            .find({"nome":{"$regex":nome}});
            const resultados = await cursor.toArray();
            let listaEscoteiros = [];
            if (resultados){
                resultados.forEach(resultado => {
                    const escoteiro = new Escoteiro(resultado._id,resultado.nome,resultado.cpf,resultado.registro,resultado.telefone,resultado.secao);
                        listaEscoteiros.push(escoteiro);
                });
                return listaEscoteiros;
            }

        }catch(e){
            console.error(e);
        }
        finally{
            this.cliente.close();
        }       
    }

    async atualizarEscoteiro(escoteiro){
        if (escoteiro instanceof Escoteiro){
            try{
                await this.cliente.connect();
                const objId = new ObjectId(escoteiro.id);
                const resultado = await this.cliente.db(basedados)                                                
                .collection(colecao).updateOne({"_id":objId},{"$set":escoteiro.toJSON()});    
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

    async excluirEscoteiro(escoteiro){
        if (escoteiro instanceof Escoteiro){
            try{
                await this.cliente.connect();
                const objId = new ObjectId(escoteiro.id);
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