import React, { useState, useEffect } from "react";
import { Api } from "../../../services";
function UserView(props) {
  const [id] = useState(props.match.params.id);
  const [user, setUser] = useState(null);

  useEffect(() => {
    Api.get("/users/" + id, {})
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {});
  }, [id]);

  return <p>User view {user?.name}</p>;
}

export default UserView;
