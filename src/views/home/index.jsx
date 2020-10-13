import React, { useState, useEffect } from "react";
import { Api } from "../../services";
import { Table, Button, Grid } from "semantic-ui-react";

function Home() {
  const [users, setUsers] = useState([]);
  const [rows, setRows] = useState(null);

  useEffect(() => {
    Api.get("/users", {})
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {});
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
            <Button basic color="blue">
              Ver
            </Button>
          </Table.Cell>
          <Table.Cell>
            <Button basic color="orange">
              Editar
            </Button>
          </Table.Cell>
          <Table.Cell>
            <Button basic color="red">
              Excluir
            </Button>
          </Table.Cell>
        </Table.Row>
      );
    });
    console.log(cells);
    setRows(cells);
  }, [users]);

  return (
    <>
      <Grid centered>
        <Grid.Row>
          <Grid.Column computer={8} mobile={16}>
            <Table striped>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Id</Table.HeaderCell>
                  <Table.HeaderCell>user name</Table.HeaderCell>
                  <Table.HeaderCell>name</Table.HeaderCell>
                  <Table.HeaderCell>E-mail</Table.HeaderCell>
                  <Table.HeaderCell></Table.HeaderCell>
                  <Table.HeaderCell></Table.HeaderCell>
                  <Table.HeaderCell></Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>{rows}</Table.Body>
            </Table>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
}

export default Home;
