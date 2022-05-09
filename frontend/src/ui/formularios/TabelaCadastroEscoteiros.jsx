import { Table, Button } from "react-bootstrap";
import { IconeEdicao, IconeExclusao } from "../icones/icones";

export default function TabelaCadastroEscoteiros(props){
    return(
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Código</th>
                    <th>Nome</th>
                    <th>Cpf</th>
                    <th>Registro</th>
                    <th>Telefone</th>
                    <th>Seção</th>
                </tr>
            </thead>
            <tbody>
                {props.escoteiros.map((escoteiro)=>{
                    return (
                        <tr key={escoteiro.id}>
                            <td>{escoteiro.id}</td>
                            <td>{escoteiro.nome}</td>
                            <td>{escoteiro.cpf}</td>
                            <td>{escoteiro.registro}</td>
                            <td>{escoteiro.telefone}</td>
                            <td>{escoteiro.secao}</td>
                            <td>
                                <Button variant="outline-primary" onClick={()=>{props.atualizarEscoteiro(escoteiro)}}><IconeEdicao/></Button>{' '}
                                <Button variant="outline-danger" onClick={()=>{props.deletarEscoteiro(escoteiro)}}><IconeExclusao/></Button>
                            </td>
                        </tr>)
                })}
            </tbody>    
        </Table>
    );
}