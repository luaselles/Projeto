export default class Produto{
    #id;
    #nomeProd;
    #descricao;
    #qtdEstoque;
    #precoCusto;
    #precoVenda;

    constructor(id,nomeProd,descricao,precoCusto,precoVenda,qtdEstoque){
        this.#id = id;
        this.#nomeProd = nomeProd;
        this.#descricao = descricao;
        this.#precoCusto=precoCusto;
        this.#precoVenda=precoVenda;
        this.#qtdEstoque=qtdEstoque;
    }

    get id(){
        return this.#id;
    }

    set id(novoId){
        this.#id = novoId;
    }

    get nomeProd(){
        return this.#nomeProd;
    }

    set nomeProd(novoNome){
        this.#nomeProd = novoNome;
    }

    get descricao(){
        return this.#descricao;
    }

    set descricao(desc){
        this.#descricao = desc;
    }

    get qtdEstoque(){
        return this.#qtdEstoque;
    }

    set qtdEstoque(qtd){
        if (!isNaN(qtd)){
            this.#qtdEstoque=qtd;
        }
    }

    get precoCusto(){
        return this.#precoCusto;
    }

    set precoCusto(preco){
        if (!isNaN(preco)){
            this.#precoCusto=preco;
        }
    }

    get precoVenda(){
        return this.#precoVenda;
    }

    set precoVenda(preco){
        if (!isNaN(preco)){
            this.#precoVenda=preco;
        }
    }

    toJSON(){
        return {
            "id":this.#id,
            "nomeProd":this.#nomeProd,
            "descricao":this.#descricao,
            "precoCusto":this.#precoCusto,
            "precoVenda":this.#precoVenda,
            "qtdEstoque":this.#qtdEstoque
        }
    }
    
}