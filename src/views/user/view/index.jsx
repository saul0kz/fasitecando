import React, { useState, useEffect } from "react";
import { Api } from "../../../services";
import Title from "../../../components/title";
import { Form, Segment, Dimmer, Loader } from "semantic-ui-react";

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
      return { ...prevState, [field]: obj };
    });
  };

  return (
    <div>
      <Title title={"Dados do Usuário"} />
      {user ? (
        <div>
          <Segment>
            <Dimmer active={loading} inverted page>
              <Loader>Carregando...</Loader>
            </Dimmer>
            <Form>
              <Form.Group>
                <Form.Input
                  label="Nome"
                  placeholder="Nome"
                  width={6}
                  value={user.name}
                  onChange={(e, { value }) => {
                    handleChangeField("name", value);
                  }}
                />
                <Form.Input
                  label="phone"
                  placeholder="phone"
                  width={4}
                  value={user.phone}
                  onChange={(e, { value }) => {
                    handleChangeField("phone", value);
                  }}
                />
                <Form.Input
                  label="E-mail"
                  placeholder="E-mail"
                  width={4}
                  value={user.email}
                  onChange={(e, { value }) => {
                    handleChangeField("email", value);
                  }}
                />
              </Form.Group>
              <Form.Group>
                <Form.Input
                  label="Web Site"
                  placeholder="Web Site"
                  width={6}
                  value={user.website}
                  onChange={(e, { value }) => {
                    handleChangeField("website", value);
                  }}
                />
              </Form.Group>
              <Form.Group>
                <Form.Input placeholder="2 Wide" value={edit} width={2} />
                <Form.Input
                  value={user.address?.street}
                  onChange={(e, { value }) => {
                    handleChangeFieldObject("address", "street", value);
                  }}
                  placeholder="12 Wide"
                  width={12}
                />
                <Form.Input
                  value={user.address?.suite}
                  placeholder="2 Wide"
                  onChange={(e, { value }) => {
                    handleChangeFieldObject("address", "suite", value);
                  }}
                  width={2}
                />
              </Form.Group>
              <Form.Group>
                <Form.Input placeholder="8 Wide" width={8} />
                <Form.Input placeholder="6 Wide" width={6} />
                <Form.Input placeholder="2 Wide" width={2} />
              </Form.Group>
            </Form>
          </Segment>
        </div>
      ) : null}
    </div>
  );
}

export default UserView;
