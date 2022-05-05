import { Table, Button } from "react-bootstrap";
import { IconeEdicao, IconeExclusao } from "../icones/icones";

export default function TabelaCadastroProdutos(props){
    return(
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Código</th>
                    <th>Nome</th>
                    <th>Descrição</th>
                    <th>Endereço</th>
                </tr>
            </thead>
            <tbody>
                {props.eventos.map((evento)=>{
                    return (
                        <tr key={evento.id}>
                            <td>{evento.id}</td>
                            <td>{evento.nomeEvent}</td>
                            <td>{evento.descricao}</td>
                            <td>{evento.endereco}</td>
                            <td>
                                <Button variant="outline-primary" onClick={()=>{props.atualizarEvento(evento)}}><IconeEdicao/></Button>{' '}
                                <Button variant="outline-danger" onClick={()=>{props.deletarEvento(evento)}}><IconeExclusao/></Button>
                            </td>
                        </tr>)
                })}
            </tbody>    
        </Table>
    );
}