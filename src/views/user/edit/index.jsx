import React, { useState, useEffect } from "react";
import { Api } from "../../../services";
import Title from "../../../components/title";
import {
  Form,
  Segment,
  Dimmer,
  Loader,
  Button,
  Message,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import validator from "validator";

function UserEdit(props) {
  const [id] = useState(props.match.params.id);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);

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
    setMessage(null);
    setUser((prevState) => {
      return { ...prevState, [field]: value };
    });
  };

  const handleChangeFieldObject = (object, field, value) => {
    setMessage(null);
    let obj = user[object];
    obj[field] = value;
    setUser((prevState) => {
      return { ...prevState, [object]: obj };
    });
  };

  const isValid = () => {
    const isNameValid = !validator.isEmpty(user.name);
    const isUserNameValid = !validator.isEmpty(user.username);
    const validators = [isNameValid, isUserNameValid];
    return !validators.includes(false);
  };

  const handleSubmit = () => {
    if (!isValid()) {
      setMessage("error");
      return;
    }
    setLoading(true);
    Api.put("/users/" + id, user)
      .then((response) => {
        setLoading(false);
        setMessage("success");
      })
      .catch((error) => {
        setLoading(false);
        setMessage("error");
      });
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
                  error={
                    validator.isEmpty(user.name)
                      ? {
                          content: "Campo obrigatório",
                        }
                      : null
                  }
                />
                <Form.Input
                  label="Username"
                  placeholder="Username"
                  width={2}
                  value={user.username}
                  error={
                    validator.isEmpty(user.username)
                      ? {
                          content: "Campo obrigatório",
                        }
                      : null
                  }
                  onChange={(e, { value }) => {
                    handleChangeField("username", value);
                  }}
                />
                <Form.Input
                  label="Telefone"
                  placeholder="Telefone"
                  width={2}
                  value={user.phone}
                  error={
                    !validator.isLength(user.phone, { min: 9, max: 30 })
                      ? {
                          content: "Telefone inválido",
                        }
                      : null
                  }
                  onChange={(e, { value }) => {
                    handleChangeField("phone", value);
                  }}
                />
                <Form.Input
                  label="E-mail"
                  placeholder="E-mail"
                  width={3}
                  value={user.email}
                  error={
                    !validator.isEmail(user.email)
                      ? {
                          content: "E-mail inválido",
                        }
                      : null
                  }
                  onChange={(e, { value }) => {
                    handleChangeField("email", value);
                  }}
                />
                <Form.Input
                  label="Web Site"
                  placeholder="Web Site"
                  width={4}
                  value={user.website}
                  error={
                    !validator.isURL(user.website) &&
                    !validator.isEmpty(user.website)
                      ? {
                          content: "Url inválida",
                        }
                      : null
                  }
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
              <Button primary onClick={handleSubmit} type="button">
                Salvar {isValid}
              </Button>
              <Link to="/">
                <Button secondary>Voltar</Button>
              </Link>
            </Segment>
            {message === "success" ? (
              <Message
                success
                header="Sucesso!"
                content="O usuário Foi atualizado com sucesso!"
              />
            ) : null}
            {message === "error" ? (
              <Message
                error
                header="Erro"
                content="Não foi possivel Atualizar o Usuário"
              />
            ) : null}
          </Segment>
        </div>
      ) : null}
    </div>
  );
}

export default UserEdit;
