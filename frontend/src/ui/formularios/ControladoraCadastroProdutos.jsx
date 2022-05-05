import { useState, useEffect } from "react";

import CadastroProdutos from "./CadastroProdutos";
import TabelaCadastroProdutos from "./TabelaCadastroProdutos";
import { Button, Spinner } from "react-bootstrap";

const localRecursos = 'http://localhost:4000/produtos';

export default function ControladoraCadastroProdutos(props){
    const [mostrarTabela, setMostrarTabela] = useState(true);
    const [produtos, setProdutos] = useState([]);

    const [foiCarregado,setFoiCarregado] = useState(false);

    const [erro, setErro] = useState(null);
    const [estaAtualizando, setEstaAtualizando] = useState(false);
    const [atualizandoProduto,setAtualizandoProduto] = useState({
        id:0,
        nomeProd: "",
        descricao:"",
        precoCusto:0,
        precoVenda:0,
        qtdEstoque:0,
    });

    function buscarProdutos(){
        fetch(localRecursos,{method:"GET"})
        .then(resposta=>resposta.json())
        .then(dados=>{
            setFoiCarregado(true);
            setProdutos(dados);
        }, 
        error =>{
            setFoiCarregado(true);
            setErro(error);
        });
    }

    function gravarProduto(produto){
        if (!estaAtualizando){
            fetch(localRecursos,{method:"POST",
                                headers:{'Content-Type':'application/json'},
                                body:JSON.stringify(produto)
            })
            .then(resposta=>resposta.json())
        }else{
            fetch(localRecursos,{method:"PUT",
                                 headers:{'Content-Type':'application/json'},
                                 body:JSON.stringify(produto)
            })
            .then(resposta=>resposta.json())
            .then(retorno => {
                if (retorno.resultado){
                    alert('Produto atualizado com sucesso!');
                }
                else{
                    alert('Não foi possível atualizar o produto!');
                }
                setEstaAtualizando(false);
            });
        }
    }

    function deletarProduto(produto)
    {
        fetch(localRecursos,{method:"DELETE",
                                headers:{'Content-Type':'application/json'},
                                body:JSON.stringify(produto)
        })
        .then(resposta=>resposta.json())
        .then(retorno => {
            if (retorno.resultado){
                alert('Produto Excluido com sucesso!');
            }
            else{
                alert('Não foi possível excluir o produto!');
            }
            setEstaAtualizando(false);
        });
    }
    function atualizarProduto(produto){
        setEstaAtualizando(true);
        setAtualizandoProduto(produto);
        setMostrarTabela(false);
    }

    useEffect(()=>{
        buscarProdutos();
    },[produtos]);
    
    if(erro){
        return <div><p>Erro ao buscar produtos : {erro.message}</p></div>
    }else if(!foiCarregado){
        return <div>
                  <Spinner animation="border" role="status">
                     <span className="visually-hidden">Carregando Produtos'...</span>
                  </Spinner>
               </div>
    }else{

        return (
            <div>
               
               {mostrarTabela ? <TabelaCadastroProdutos produtos={produtos} atualizarProduto={atualizarProduto} deletarProduto={deletarProduto} />:
                               <CadastroProdutos onGravar={gravarProduto} produto={atualizandoProduto}/>}
           
           <Button onClick={()=>setMostrarTabela(!mostrarTabela)}>
                   Cadastrar
               </Button>
            </div> 
            
                              
         );
    }
}