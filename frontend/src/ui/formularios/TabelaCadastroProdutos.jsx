import { Table, Button } from "react-bootstrap";
import { IconeEdicao, IconeExclusao } from "../icones/icones";
import '../../estilos/tabela.css'

export default function TabelaCadastroProdutos(props){
    return(
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Código</th>
                    <th>Nome</th>
                    <th>Descrição</th>
                    <th>Preço de Custo</th>
                    <th>Preço de Venda</th>
                    <th>Quantidade em estoque</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {props.produtos.map((produto)=>{
                    return (
                        <tr key={produto.id}>
                            <td>{produto.id}</td>
                            <td>{produto.nomeProd}</td>
                            <td>{produto.descricao}</td>
                            <td>{produto.precoCusto}</td>
                            <td>{produto.precoVenda}</td>
                            <td>{produto.qtdEstoque}</td>
                            <td>
                                <Button variant="outline-primary" onClick={()=>{props.atualizarProduto(produto)}}><IconeEdicao/></Button>{' '}
                                <Button variant="outline-danger" onClick={()=>{props.deletarProduto(produto)}}><IconeExclusao/></Button>
                            </td>
                        </tr>)
                })}
            </tbody>    
        </Table>
    );
}