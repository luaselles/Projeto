export default class Escoteiro {
    #id;
    #nome;
    #cpf;
    #registro;
    #telefone;
    #secao;

    constructor (id, nome, cpf, registro, telefone, secao){
        this.#id = id;
        this.#nome = nome;
        this.#cpf = cpf;
        this.#registro = registro;
        this.#telefone = telefone;
        this.#secao = secao;
    }

    get id() {
        return this.#id;
    }
    set id(novoId) {
        this.#id = novoId;
    }

    get nome() {
        return this.#nome;
    }
    set nome(novoNome) {
        this.#nome = novoNome;
    }

    get cpf() {
        return this.#cpf;
    }
    set cpf(novoCpf) {
        this.#cpf = novoCpf;
    }

    get registro() {
        return this.#registro;
    }
    set registro(novoRegistro) {
        this.#registro = novoRegistro;
    }

    get telefone() {
        return this.#telefone;
    }
    set telefone(novoTelefone) {
        this.#telefone = novoTelefone;
    }

    get secao() {
        return this.#secao;
    }
    set secao(novaSecao) {
        this.#secao = novaSecao;
    }
}