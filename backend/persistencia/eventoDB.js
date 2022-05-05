import {MongoClient, ObjectId} from 'mongodb';
import Evento from '../modelo/evento.js';

const uri = "mongodb://localhost:27017";
const basedados = "BaseDB";
const colecao = "Eventos";

export default class EventoDB{
    constructor(){
        this.cliente = new MongoClient(uri);
    }

    async incluirEvento(evento){
        if (evento instanceof Evento){
            try{
                await this.cliente.connect();
                const resultado = await this.cliente.db(basedados)
                .collection(colecao).insertOne({"nomeEvent": evento.nomeEvent ,"descricao":evento.descricao,
                                                "endereco":evento.endereco});
                evento.id = resultado.insertedId.toString();
                return resultado.insertedId.toString();
            }catch(e){
                console.error(e);
            }
            finally{
                this.cliente.close();
            }
        }
    }

    async consultarEventoId(id){
        try{
            const objId = new ObjectId(id);
            await this.cliente.connect();
            const resultado = await this.cliente.db(basedados).collection(colecao)
            .findOne({"_id":objId});
            if (resultado){
                const event = new Evento(resultado._id,resultado.nomeEvent,resultado.descricao,
                                         resultado.endereco);
                return event;
            }

        }catch(e){
            console.error(e);
        }
        finally{
            this.cliente.close();
        }       
    }

    async consultarEventoDescricao(desc){
        try{
            await this.cliente.connect();
            const cursor = this.cliente.db(basedados).collection(colecao)
            .find({"descricao":{"$regex":desc}});
            const resultados = await cursor.toArray();
            let listaEventos = [];
            if (resultados){
                resultados.forEach(resultado => {
                    const event = new Evento(resultado._id,resultado.nomeEvent,resultado.descricao,
                        resultado.endereco);
                        listaEventos.push(event);
                });
                return listaEventos;
            }

        }catch(e){
            console.error(e);
        }
        finally{
            this.cliente.close();
        }       
    }

    async atualizarEvento(evento){
        if (evento instanceof Evento){
            try{
                await this.cliente.connect();
                const objId = new ObjectId(evento.id);
                const resultado = await this.cliente.db(basedados)                                                
                .collection(colecao).updateOne({"_id":objId},{"$set":evento.toJSON()});    
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

    async excluirEvento(evento){
        if (evento instanceof Evento){
            try{
                await this.cliente.connect();
                const objId = new ObjectId(evento.id);
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