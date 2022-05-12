import { useState, useEffect } from "react";

import CadastroEscoteiros from "./CadastroEscoteiros";
import TabelaCadastroEscoteiros from "./TabelaCadastroEscoteiros";
import { Button, Spinner } from "react-bootstrap";

const localRecursos = 'http://localhost:4000/escoteiros';

export default function ControladoraCadastroEscoteiros(props){
    const [mostrarTabela, setMostrarTabela] = useState(true);
    const [escoteiros, setEscoteiros] = useState([]);

    const [foiCarregado,setFoiCarregado] = useState(false);

    const [erro, setErro] = useState(null);
    const [estaAtualizando, setEstaAtualizando] = useState(false);
    const [atualizandoEscoteiro, setAtualizandoEscoteiro] = useState({
        id: 0,
        nome: "",
        cpf: "",
        registro: "",
        telefone: "",
        secao: "",
    });

    function buscarEscoteiros(){
        fetch(localRecursos,{method:"GET"})
        .then(resposta=>resposta.json())
        .then(dados=>{
            setFoiCarregado(true);
            setEscoteiros(dados);
        }, 
        error =>{
            setFoiCarregado(true);
            setErro(error);
        });
    }

    function gravarEscoteiro(escoteiro){
        if (!estaAtualizando){
            fetch(localRecursos,{method:"POST",
                                headers:{'Content-Type':'application/json'},
                                body:JSON.stringify(escoteiro)
            })
            .then(resposta=>resposta.json())
        }else{
            fetch(localRecursos,{method:"PUT",
                                 headers:{'Content-Type':'application/json'},
                                 body:JSON.stringify(escoteiro)
            })
            .then(resposta=>resposta.json())
            .then(retorno => {
                if (retorno.resultado){
                    alert('Escoteiro atualizado com sucesso!');
                }
                else{
                    alert('Não foi possível atualizar o Escoteiro!');
                }
                setEstaAtualizando(false);
            });
        }
    }

    function deletarEscoteiro(escoteiro)
    {
        fetch(localRecursos,{method:"DELETE",
                                headers:{'Content-Type':'application/json'},
                                body:JSON.stringify(escoteiro)
        })
        .then(resposta=>resposta.json())
        .then(retorno => {
            if (retorno.resultado){
                alert('Escoteiro Excluido com sucesso!');
            }
            else{
                alert('Não foi possível excluir o Escoteiro!');
            }
            setEstaAtualizando(false);
        });
    }
    function atualizarEscoteiro(escoteiro){
        setEstaAtualizando(true);
        setAtualizandoEscoteiro(escoteiro);
        setMostrarTabela(false);
    }

    useEffect(()=>{
        buscarEscoteiros();
    },[escoteiros]);
    
    if(erro){
        return <div><p>Erro ao buscar escoteiros : {erro.message}</p></div>
    }else if(!foiCarregado){
        return <div>
                  <Spinner animation="border" role="status">
                     <span className="visually-hidden">Carregando Escoteiros'...</span>
                  </Spinner>
               </div>
    }else{

        return (
            <div>
               
               {mostrarTabela ? <TabelaCadastroEscoteiros escoteiros={escoteiros} atualizarEscoteiro={atualizarEscoteiro} deletarEscoteiro={deletarEscoteiro} />:
                               <CadastroEscoteiros onGravar={gravarEscoteiro} escoteiro={atualizandoEscoteiro}/>}

                <Button onClick={()=>setMostrarTabela(!mostrarTabela)}>
                   Cadastrar
               </Button>
            </div> 
                              
         );
    }
}