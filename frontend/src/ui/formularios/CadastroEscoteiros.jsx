import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

export default function CadastroEscoteiros(props) {
    const [escoteiro, setEscoteiro] = useState(props.escoteiro);
    const [formValidado, setFormValidado] = useState(false);

    function manipularSubmissaoDados(e) {
        const formulario = e.currentTarget;
        alert(formulario.checkValidity());
        if (formulario.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        } else {
            props.onGravar(escoteiro);
        }

        setFormValidado(true);
    }


    function manipularMudanca(e) {
        const componente = e.target;
        const valor = componente.value;
        const nome = componente.name;
        setEscoteiro({ ...escoteiro, [nome]: valor });
    }

    function verificaCodigo(e) {
        const componente = e.target;
        if (isNaN(Number(componente.value))) {
            componente.setCustomValidity("Erro");
            setFormValidado(false);
        } else {
            componente.setCustomValidity("");
        }
    }

    function verificaNome(e) {
        const componente = e.target;
        const texto = componente.value;
        if (texto.length < 4) {
            componente.setCustomValidity("Erro");
            setFormValidado(false);
        } else {
            componente.setCustomValidity("");
        }
    }

    function verificaRegistro(e) {
        const componente = e.target;
        const texto = componente.value;
        if (texto.length < 7) {
            componente.setCustomValidity("Erro");
            setFormValidado(false);
        } else {
            componente.setCustomValidity("");
        }
    }


    function verificaTelefone(e) {
        const componente = e.target;
        if (isNaN(Number(componente.value))) {
            componente.setCustomValidity("Erro");
            setFormValidado(false);
        } else {
            componente.setCustomValidity("");
        }
    }

    function verificaSecao(e) {
        const componente = e.target;
        const texto = componente.value;
        if (texto.length < 5) {
            componente.setCustomValidity("Erro");
            setFormValidado(false);
        } else {
            componente.setCustomValidity("");
        }
    }

    return (
        <Container>
            <Form noValidate validated={formValidado} onSubmit={manipularSubmissaoDados} method="get" action="#">
                <fieldset className="border bg-light p-5 m-2">
                    <h3>Cadastro de Escoteiros:</h3>
                    <Row className="m-3">
                        <Col xs={12} md={3}>
                            <Form.Label>Código:</Form.Label>
                        </Col>
                        <Col xs={12} md={4}>
                            <Form.Control
                                type="text"
                                id="id"
                                name="id"
                                value={escoteiro.id}
                                onChange={manipularMudanca}
                                onBlur={verificaCodigo} disabled />
                            <Form.Control.Feedback type="invalid">
                                Código inválido.
                            </Form.Control.Feedback>
                        </Col>
                    </Row>
                    <Row className="m-3">
                        <Col xs={12} md={3}>
                            <Form.Label>Nome Completo:</Form.Label>
                        </Col>
                        <Col xs={12} md={3}>
                            <Form.Control
                                type="text"
                                id="nome"
                                name="nome"
                                placeholder="Digite o nome completo"
                                value={escoteiro.nome}
                                onChange={manipularMudanca}
                                onBlur={verificaNome}
                            />
                            <Form.Control.Feedback type="invalid">
                                O nome deve ter pelo menos 4 caracteres.
                            </Form.Control.Feedback>
                        </Col>
                    </Row>
                    <Row className="m-3">
                        <Col xs={12} md={3}>
                            <Form.Label>Cpf:</Form.Label>
                        </Col>
                        <Col xs={12} md={4}>
                            <Form.Control
                                type="text"
                                id="cpf"
                                name="cpf"
                                placeholder="Digite o cpf"
                                value={escoteiro.cpf}
                                onChange={manipularMudanca}
                            />
                            <Form.Control.Feedback type="invalid">
                            </Form.Control.Feedback>
                        </Col>
                    </Row>
                    <Row className="m-3">
                        <Col xs={12} md={3}>
                            <Form.Label>Registro Escoteiro:</Form.Label>
                        </Col>
                        <Col xs={12} md={3}>
                            <Form.Control
                                type="text"
                                id="registro"
                                name="registro"
                                placeholder="Digite o registro escoteiro"
                                value={escoteiro.registro}
                                onChange={manipularMudanca}
                                onBlur={verificaRegistro}
                            />
                            <Form.Control.Feedback type="invalid">
                                O registro deve ter pelo menos 7 caracteres.
                            </Form.Control.Feedback>
                        </Col>
                    </Row>
                    <Row className="m-3">
                        <Col xs={12} md={3}>
                            <Form.Label>Telefone:</Form.Label>
                        </Col>
                        <Col xs={12} md={3}>
                            <Form.Control
                                type="text"
                                id="telefone"
                                name="telefone"
                                placeholder="Digite o telefone para contato"
                                value={escoteiro.telefone}
                                onChange={manipularMudanca}
                                onBlur={verificaTelefone}
                            />
                            <Form.Control.Feedback type="invalid">
                                O telefone deve ser um número.
                            </Form.Control.Feedback>
                        </Col>
                        <Row className="m-3">
                            <Col xs={12} md={3}>
                                <Form.Label>Seção:</Form.Label>
                            </Col>
                            <Col xs={12} md={3}>
                                <Form.Control
                                    type="text"
                                    id="secao"
                                    name="secao"
                                    placeholder="Digite a seção do escoteiro"
                                    value={escoteiro.secao}
                                    onChange={manipularMudanca}
                                    onBlur={verificaSecao}
                                />
                                <Form.Control.Feedback type="invalid">
                                    A seção deve ter pelo menos 5 caracteres.
                                </Form.Control.Feedback>
                            </Col>
                        </Row>
                    </Row>
                    <Row className="m-3">
                        <Col xs={12} md={{ offset: 5 }}>
                            <Button variant="success" type="submit">Cadastrar</Button>
                        </Col>
                    </Row>
                </fieldset>
            </Form>
        </Container>
    );
}