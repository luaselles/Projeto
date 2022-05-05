import '../../estilos/cabecalho.css'

export function Cabecalho(props){
    
    return(
        <div className="cabecalho">
            <div className="titulo">
            <h1>{props.titulo}</h1>
            </div>
            
        </div>
    );
}
