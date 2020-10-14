import React, { useState, useEffect } from "react";
import { Api } from "../../../services";
import Title from "../../../components/title";
import { Form, Segment, Dimmer, Loader, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

function UserView(props) {
  const [id] = useState(props.match.params.id);
  const [user, setUser] = useState(null);
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Api.get("/users/" + id, {})
      .then((response) => {
        setUser(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, [id]);

  const handleChangeField = (field, value) => {
    setEdit(true);
    setUser((prevState) => {
      return { ...prevState, [field]: value };
    });
  };

  const handleChangeFieldObject = (object, field, value) => {
    setEdit(true);
    let obj = user[object];
    obj[field] = value;
    setUser((prevState) => {
      return { ...prevState, [object]: obj };
    });
  };

  const handleSubmit = () => { 
  };

  return (
    <div>
      <Title title={"Dados do Usuário"} />
      {user ? (
        <div style={{ width: "80%", margin: "auto" }}>
          <Segment>
            <Dimmer active={loading} inverted page>
              <Loader>Carregando...</Loader>
            </Dimmer>
            <Form>
              <Form.Group>
                <Form.Input                                                    
                  label="Nome*"
                  placeholder="Nome*"
                  width={3}
                  value={user.name}
                  onChange={(e, { value }) => {
                    handleChangeField("name", value);
                  }}
                  error={{
                    content: 'Campo obrigatório',                  
                  }}
                />
                <Form.Input
                  label="Username"
                  placeholder="Username"
                  width={2}
                  value={user.username}
                  onChange={(e, { value }) => {
                    handleChangeField("username", value);
                  }}
                />
                <Form.Input
                  label="Telefone"
                  placeholder="Telefone"
                  width={2}
                  value={user.phone}
                  onChange={(e, { value }) => {
                    handleChangeField("phone", value);
                  }}
                />
                <Form.Input
                  label="E-mail"
                  placeholder="E-mail"
                  width={3}
                  value={user.email}
                  onChange={(e, { value }) => {
                    handleChangeField("email", value);
                  }}
                />
                <Form.Input
                  label="Web Site"
                  placeholder="Web Site"
                  width={4}
                  value={user.website}
                  onChange={(e, { value }) => {
                    handleChangeField("website", value);
                  }}
                />
              </Form.Group>
              <Form.Group>
                <label>Endereço:</label>
              </Form.Group>
              <Form.Group>
                <Form.Input
                  label="Rua"
                  placeholder="Rua"
                  value={user.address.street}
                  onChange={(e, { value }) => {
                    handleChangeFieldObject("address", "street", value);
                  }}
                  width={3}
                />
                <Form.Input
                  label="Suite"
                  placeholder="Suite"
                  value={user.address.suite}
                  onChange={(e, { value }) => {
                    handleChangeFieldObject("address", "suite", value);
                  }}
                  width={2}
                />
                <Form.Input
                  label="Cidade"
                  placeholder="Cidade"
                  value={user.address.city}
                  onChange={(e, { value }) => {
                    handleChangeFieldObject("address", "city", value);
                  }}
                  width={2}
                />
                <Form.Input
                  label="Zipcode"
                  placeholder="Zipcode"
                  value={user.address.zipcode}
                  onChange={(e, { value }) => {
                    handleChangeFieldObject("address", "zipcode", value);
                  }}
                  width={3}
                />
              </Form.Group>
              <Form.Group>
                <label>Empresa:</label>
              </Form.Group>
              <Form.Group>
                <Form.Input
                  label="Nome"
                  placeholder="Nome"
                  value={user.company.name}
                  onChange={(e, { value }) => {
                    handleChangeFieldObject("company", "name", value);
                  }}
                  width={3}
                />
                <Form.Input
                  label="Catch Phrase"
                  placeholder="Catch Phrase"
                  value={user.company.catchPhrase}
                  onChange={(e, { value }) => {
                    handleChangeFieldObject("company", "catchPhrase", value);
                  }}
                  width={4}
                />
                <Form.Input
                  label="bs"
                  placeholder="bs"
                  value={user.company.bs}
                  onChange={(e, { value }) => {
                    handleChangeFieldObject("company", "bs", value);
                  }}
                  width={3}
                />
              </Form.Group>
            </Form>
            <Segment vertical>
              <Button primary disabled={!edit} onClick={handleSubmit} type="button">
                Salvar {edit}
              </Button>
              <Link to="/">
                <Button secondary>Voltar</Button>
              </Link>
            </Segment>
          </Segment>
        </div>
      ) : null}
    </div>
  );
}

export default UserView;
