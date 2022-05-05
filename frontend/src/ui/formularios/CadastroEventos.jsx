import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

export default function CadastroEventos(props){
    const [evento,setEvento] = useState(props.evento);
    const [formValidado, setFormValidado] = useState(false);

    function manipularSubmissaoDados(e){
        const formulario = e.currentTarget;
        alert(formulario.checkValidity());
        if (formulario.checkValidity() === false){
            e.preventDefault();
            e.stopPropagation();
        }else{
            props.onGravar(evento);
        }

        setFormValidado(true);
    }

       
    function manipularMudanca(e)
    {
        const componente = e.target;
        const valor = componente.value;
        const nome = componente.name;
        setEvento({...evento,[nome]:valor});
    }

    function verificaNome(e){
        const componente = e.target;
        const texto = componente.value;
        if (texto.length < 4)
        {
            componente.setCustomValidity("Erro");
            setFormValidado(false);
        }
        else{
            componente.setCustomValidity("");
        }
    }

    function verificaDescricao(e){
        const componente = e.target;
        const texto = componente.value;
        if (texto.length < 6)
        {
            componente.setCustomValidity("Erro");
            setFormValidado(false);
        }
        else{
            componente.setCustomValidity("");
        }
    }


    function verificaCodigo(e){
        const componente = e.target;
        if(isNaN(Number(componente.value))){
            componente.setCustomValidity("Erro");
            setFormValidado(false);
        }
        else{
            componente.setCustomValidity("");
        }
    }


    return(
        <Container>
            <Form noValidate validated={formValidado} onSubmit={manipularSubmissaoDados} method="get" action="#">
                <fieldset className="border bg-light p-5 m-2">
                    <h3>Cadastro de Eventos:</h3>
                    <Row className="m-3">
                        <Col xs={12} md={3}>
                            <Form.Label>Código:</Form.Label>
                        </Col>
                        <Col xs={12} md={4}>
                            <Form.Control 
                            type="text" 
                            id="id" 
                            name="id"
                            value={evento.id}
                            onChange={manipularMudanca}
                            onBlur={verificaCodigo} disabled/>
                            <Form.Control.Feedback type="invalid">
                                Código inválido.
                            </Form.Control.Feedback>
                        </Col>
                    </Row>
                    <Row className="m-3">
                        <Col xs={12} md={3}>
                            <Form.Label>Nome Do Evento:</Form.Label>
                        </Col>
                        <Col xs={12} md={3}>
                            <Form.Control 
                            type="text" 
                            id="nomeEvent" 
                            name="nomeEvent" 
                            placeholder="Digite o nome do Evento"
                            value={evento.nomeEvent}
                            onChange={manipularMudanca}
                            onBlur={verificaNome}
                            />
                            <Form.Control.Feedback type="invalid">
                                O nome do evento deve ter pelo menos 4 caracteres.
                            </Form.Control.Feedback>
                        </Col>
                        <Col xs={12} md={2}>
                            <Form.Label>Data do Evento:</Form.Label>
                        </Col>
                        <Col xs={12} md={2}>
                            <Form.Control 
                            type="date" 
                            id="data" 
                            name="data" 
                            placeholder="Digite a data do Evento"
                            value={evento.data}
                            onChange={manipularMudanca}
                            onBlur={verificaNome}
                            />   
                        </Col>
                    </Row>
                    <Row className="m-3">
                        <Col xs={12} md={3}>
                            <Form.Label>Descrição do Evento:</Form.Label>
                        </Col>
                        <Col xs={12} md={4}>
                            <Form.Control 
                            type="text" 
                            id="descricao" 
                            name="descricao" 
                            placeholder="Digite a descrição do Evento"
                            value={evento.descricao}
                            onChange={manipularMudanca}
                            onBlur={verificaDescricao}
                            />
                            <Form.Control.Feedback type="invalid">
                                A descrição do evento deve ter pelo menos 6 caracteres.
                            </Form.Control.Feedback>
                        </Col>
                    </Row>
                    <Row className="m-3">
                        <Col xs={12} md={3}>
                            <Form.Label>Rua do Evento:</Form.Label>
                        </Col>
                        <Col xs={12} md={3}>
                            <Form.Control 
                            type="text" 
                            id="endereco" 
                            name="endereco" 
                            placeholder="Digite a endereço do Evento"
                            value={evento.endereco}
                            onChange={manipularMudanca}
                            onBlur={verificaDescricao}
                            />
                            <Form.Control.Feedback type="invalid">
                                O endereço do evento deve ter pelo menos 6 caracteres.
                            </Form.Control.Feedback>
                        </Col>
                        <Col xs={12} md={3}>
                            <Form.Label>Cidade do Evento:</Form.Label>
                        </Col>
                        <Col xs={12} md={3}>
                            <Form.Control 
                            type="text" 
                            id="cid" 
                            name="cid" 
                            placeholder="Digite a Cidade do Evento"
                            value={evento.endereco}
                            onChange={manipularMudanca}
                            onBlur={verificaDescricao}
                            />
                            <Form.Control.Feedback type="invalid">
                                O endereço do evento deve ter pelo menos 6 caracteres.
                            </Form.Control.Feedback>
                        </Col>
                        <Row className="m-2">
                        <Col xs={12} md={3}>
                            <Form.Label>N° do endereço:</Form.Label>
                        </Col>
                        <Col xs={12} md={3}>
                            <Form.Control 
                            type="number" 
                            id="num" 
                            name="num" 
                            placeholder="Digite a Número do Evento"
                            value={evento.num}
                            onChange={manipularMudanca}
                            onBlur={verificaDescricao}
                            />
                            <Form.Control.Feedback type="invalid">   
                            </Form.Control.Feedback>
                        </Col>
                    </Row>
                    </Row>
                    <Row className="m-3">
                        <Col xs={12} md={{offset:5}}>
                            <Button variant="success" type="submit">Cadastrar</Button>
                        </Col>
                    </Row>
                </fieldset>
            </Form>
        </Container>
    );
}