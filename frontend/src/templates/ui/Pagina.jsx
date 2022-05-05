import {Cabecalho} from './Cabecalho'
import {Menu} from './Menu'
import {Rodape} from './Rodape'
import '../../estilos/principal.css'

export function Pagina(props){
    return (
        <div>
            <Cabecalho titulo="G.E. Guayporé"/>
            <div className="corpo">
                <aside>
                    <Menu itens={[ {rotulo:"Home",url:"/"},
                                   {rotulo:"Produtos",url:"/produtos"},
                                   {rotulo:"Eventos",url:"/eventos"} ]} />
                </aside>
                <div className="conteudo">
                          {props.children}
                </div>
            </div>
            <Rodape/>
        </div>
    );
}