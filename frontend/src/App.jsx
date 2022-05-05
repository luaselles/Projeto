import {BrowserRouter, Routes, Route} from 'react-router-dom'

import { PaginaHome, PaginaProduto,PaginaEvento,Pagina404 } from './ui/Paginas'

import 'bootstrap/dist/css/bootstrap.min.css'

export default function App(props){
    return(
        <div>
            <BrowserRouter>
                    <Routes>
                        <Route exact path="/" element={<PaginaHome/>}/>
                        <Route path="/produtos" element={<PaginaProduto/>}/>
                        <Route path="/eventos" element={<PaginaEvento/>}/>
                        <Route component={Pagina404}/>
                    </Routes>
            </BrowserRouter>            
        </div>
    );
}