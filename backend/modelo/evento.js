export default class Evento{
    #id;
    #nomeEvent;
    #descricao;
    #endereco;

    constructor(id,nomeEvent,descricao,endereco){
        this.#id = id;
        this.#nomeEvent = nomeEvent;
        this.#descricao = descricao;
        this.#endereco=endereco;
        
    }

    get id(){
        return this.#id;
    }

    set id(novoId){
        this.#id = novoId;
    }

    get nomeEvent(){
        return this.#nomeEvent;
    }

    set nomeEvent(novoNome){
        this.#nomeEvent = novoNome;
    }

    get descricao(){
        return this.#descricao;
    }

    set descricao(desc){
        this.#descricao = desc;
    }

    
    get endereco(){
        return this.#endereco;
    }

    set endereco(end){
        this.#endereco = end;
    }




    toJSON(){
        return {
            "id":this.#id,
            "nomeEvent":this.#nomeEvent,
            "descricao":this.#descricao,
            "endereco":this.#endereco
        }
    }
    
}