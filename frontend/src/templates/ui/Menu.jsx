import {Link} from 'react-router-dom'
import '../../estilos/menu.css'

export function Menu(props){
    return(
        <div className="menu">
            <ul>
                {
                    props.itens.map(({rotulo,url}, i) =>{
                     return <li key={i}><Link to={url}>{rotulo}</Link></li>         
                    })
                }
            </ul>    
        </div>
    );
}