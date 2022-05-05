
import { Pagina } from "../templates/ui/Pagina";
import ControladoraCadastroProdutos from "./formularios/ControladoraCadastroProdutos";
import ControladoraCadastroEventos from "./formularios/ControladoraCadastroEventos";
import Home from "./formularios/Home";

export function PaginaHome(props){
    return(
        <Pagina>
           <Home/>
        </Pagina>
    );
}

export function PaginaProduto(props){

    function manipulaSubmissaoDados(e){
        e.preventDefault();
    }

    return(
        <Pagina>
            <ControladoraCadastroProdutos/>
        </Pagina>
    );
}

export function PaginaEvento(props){

    function manipulaSubmissaoDados(e){
        e.preventDefault();
    }

    return(
        <Pagina>
            <ControladoraCadastroEventos/>
        </Pagina>
    );
}

export function Pagina404(props){
    return(
        <Pagina>
            <h1>Opss!! Página não existe!</h1>
        </Pagina>
    );
}

