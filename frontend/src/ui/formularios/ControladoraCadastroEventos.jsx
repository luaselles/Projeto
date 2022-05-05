import { useState, useEffect } from "react";

import CadastroEventos from "./CadastroEventos";
import TabelaCadastroEventos from "./TabelaCadastroEventos";
import { Button, Spinner } from "react-bootstrap";

const localRecursos = 'http://localhost:4000/eventos';

export default function ControladoraCadastroEventos(props){
    const [mostrarTabela, setMostrarTabela] = useState(true);
    const [eventos, setEventos] = useState([]);

    const [foiCarregado,setFoiCarregado] = useState(false);

    const [erro, setErro] = useState(null);
    const [estaAtualizando, setEstaAtualizando] = useState(false);
    const [atualizandoEvento,setAtualizandoEvento] = useState({
        id:0,
        nomeEvent: "",
        descricao:"",
        endereco:"",
    });

    function buscarEventos(){
        fetch(localRecursos,{method:"GET"})
        .then(resposta=>resposta.json())
        .then(dados=>{
            setFoiCarregado(true);
            setEventos(dados);
        }, 
        error =>{
            setFoiCarregado(true);
            setErro(error);
        });
    }

    function gravarEvento(evento){
        if (!estaAtualizando){
            fetch(localRecursos,{method:"POST",
                                headers:{'Content-Type':'application/json'},
                                body:JSON.stringify(evento)
            })
            .then(resposta=>resposta.json())
        }else{
            fetch(localRecursos,{method:"PUT",
                                 headers:{'Content-Type':'application/json'},
                                 body:JSON.stringify(evento)
            })
            .then(resposta=>resposta.json())
            .then(retorno => {
                if (retorno.resultado){
                    alert('Evento atualizado com sucesso!');
                }
                else{
                    alert('Não foi possível atualizar o Evento!');
                }
                setEstaAtualizando(false);
            });
        }
    }

    function deletarEvento(evento)
    {
        fetch(localRecursos,{method:"DELETE",
                                headers:{'Content-Type':'application/json'},
                                body:JSON.stringify(evento)
        })
        .then(resposta=>resposta.json())
        .then(retorno => {
            if (retorno.resultado){
                alert('Evento Excluido com sucesso!');
            }
            else{
                alert('Não foi possível excluir o evento!');
            }
            setEstaAtualizando(false);
        });
    }
    function atualizarEvento(evento){
        setEstaAtualizando(true);
        setAtualizandoEvento(evento);
        setMostrarTabela(false);
    }

    useEffect(()=>{
        buscarEventos();
    },[eventos]);
    
    if(erro){
        return <div><p>Erro ao buscar eventos : {erro.message}</p></div>
    }else if(!foiCarregado){
        return <div>
                  <Spinner animation="border" role="status">
                     <span className="visually-hidden">Carregando Eventos'...</span>
                  </Spinner>
               </div>
    }else{

        return (
            <div>
               
               {mostrarTabela ? <TabelaCadastroEventos eventos={eventos} atualizarEvento={atualizarEvento} deletarEvento={deletarEvento} />:
                               <CadastroEventos onGravar={gravarEvento} evento={atualizandoEvento}/>}

                <Button onClick={()=>setMostrarTabela(!mostrarTabela)}>
                   Cadastrar
               </Button>
            </div> 
                              
         );
    }
}