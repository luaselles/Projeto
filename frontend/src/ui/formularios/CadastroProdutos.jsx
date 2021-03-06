import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

export default function CadastroProdutos(props){
    const [produto,setProduto] = useState(props.produto);
    const [formValidado, setFormValidado] = useState(false);

    function manipularSubmissaoDados(e){
        const formulario = e.currentTarget;
        alert(formulario.checkValidity());
        if (formulario.checkValidity() === false){
            e.preventDefault();
            e.stopPropagation();
        }else{
            props.onGravar(produto);
        }

        setFormValidado(true);
    }

       
    function manipularMudanca(e)
    {
        const componente = e.target;
        const valor = componente.value;
        const nome = componente.name;
        setProduto({...produto,[nome]:valor});
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

    function verificaNum(e){
        const componente = e.target;
        if(isNaN(Number(componente.value))){
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
                    <h3>Cadastro de produtos:</h3>
                    <Row className="m-3">
                        <Col xs={12} md={3}>
                            <Form.Label>C??digo:</Form.Label>
                        </Col>
                        <Col xs={12} md={4}>
                            <Form.Control 
                            type="text" 
                            id="id" 
                            name="id"
                            value={produto.id}
                            onChange={manipularMudanca}
                            onBlur={verificaCodigo} disabled/>
                            <Form.Control.Feedback type="invalid">
                                C??digo inv??lido.
                            </Form.Control.Feedback>
                        </Col>
                    </Row>
                    <Row className="m-3">
                        <Col xs={12} md={3}>
                            <Form.Label>Nome:</Form.Label>
                        </Col>
                        <Col xs={12} md={4}>
                            <Form.Control 
                            type="text" 
                            id="nomeProd" 
                            name="nomeProd" 
                            placeholder="Digite o nome do produto"
                            value={produto.nomeProd}
                            onChange={manipularMudanca}
                            onBlur={verificaNome}
                            />
                            <Form.Control.Feedback type="invalid">
                                O nome do produto deve ter pelo menos 4 caracteres.
                            </Form.Control.Feedback>
                        </Col>
                    </Row>
                    <Row className="m-3">
                        <Col xs={12} md={3}>
                            <Form.Label>Descri????o:</Form.Label>
                        </Col>
                        <Col xs={12} md={4}>
                            <Form.Control 
                            type="text" 
                            id="descricao" 
                            name="descricao" 
                            placeholder="Digite a descri????o do produto"
                            value={produto.descricao}
                            onChange={manipularMudanca}
                            onBlur={verificaDescricao}
                            />
                            <Form.Control.Feedback type="invalid">
                                A descri????o do produto deve ter pelo menos 6 caracteres.
                            </Form.Control.Feedback>
                        </Col>
                    </Row>
                    <Row className="m-3">
                        <Col xs={12} md={3}>
                            <Form.Label>Pre??o de custo:</Form.Label>
                        </Col>
                        <Col xs={12} md={4}>
                            <Form.Control 
                            type="number" 
                            id="precoCusto" 
                            name="precoCusto" 
                            value={produto.precoCusto}
                            onChange={manipularMudanca}
                            onBlur={verificaNum}/>
                            <Form.Control.Feedback type="invalid">
                                Valor inv??lido.
                            </Form.Control.Feedback>
                        </Col>
                    </Row>
                    <Row className="m-3">
                        <Col xs={12} md={3}>
                            <Form.Label>Pre??o de venda:</Form.Label>
                        </Col>
                        <Col xs={12} md={4}>
                            <Form.Control 
                            type="number" 
                            id="precoVenda" 
                            name="precoVenda" 
                            value={produto.precoVenda}
                            onChange={manipularMudanca}
                            onBlur={verificaNum}/>
                            <Form.Control.Feedback type="invalid">
                                Valor inv??lido.
                            </Form.Control.Feedback>
                        </Col>
                    </Row>
                    <Row className="m-3">
                        <Col xs={12} md={3}>
                            <Form.Label>Quantidade em estoque:</Form.Label>
                        </Col>
                        <Col xs={12} md={4}>
                            <Form.Control 
                            type="number" 
                            id="qtdEstoque" 
                            name="qtdEstoque" 
                            min={0}
                            value={produto.qtdEstoque}
                            onChange={manipularMudanca}
                            onBlur={verificaNum}/>
                            <Form.Control.Feedback type="invalid">
                                Quantidade inv??lida.
                            </Form.Control.Feedback>
                        </Col>
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