import React, { useState, useEffect } from "react";
import { Api } from "../../services";
import {
  Table,
  Button,
  Grid,
  Loader,
  Dimmer,
  Segment,
} from "semantic-ui-react";
import Title from "../../components/title/index";
import { Link } from "react-router-dom";

function Home() {
  const [users, setUsers] = useState([]);
  const [rows, setRows] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Api.get("/users", {})
      .then((response) => {
        setUsers(response.data);
      setLoading(false);
      })
      .catch((error) => { setLoading(false);});
  
  }, []);

  useEffect(() => {
    let cells = users.map((user) => {
      return (
        <Table.Row>
          <Table.Cell>{user.id} </Table.Cell>
          <Table.Cell>{user.username} </Table.Cell>
          <Table.Cell>{user.name}</Table.Cell>
          <Table.Cell>{user.email}</Table.Cell>
          <Table.Cell>
            <Link to={"./users/" + user.id}>
              <Button basic color="blue">
                ver
              </Button>
            </Link>
          </Table.Cell>
          <Table.Cell>
            <Button basic color="red">
              excluir
            </Button>
          </Table.Cell>
        </Table.Row>
      );
    });    
    setRows(cells);
  }, [users]);

  return (
    <>
      <Title title="Lista de Usuários" />
      <Segment>
        <Dimmer active={loading} inverted page>
          <Loader>Carregando...</Loader>
        </Dimmer>
        <Grid centered>
          <Grid.Row>
            <Grid.Column computer={10} mobile={16}>
              <Table striped>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Id</Table.HeaderCell>
                    <Table.HeaderCell>Username</Table.HeaderCell>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>E-mail</Table.HeaderCell>
                    <Table.HeaderCell></Table.HeaderCell>
                    <Table.HeaderCell></Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>{rows}</Table.Body>
              </Table>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </>
  );
}

export default Home;
