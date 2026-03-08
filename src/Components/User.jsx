import React, { useEffect } from "react";
import { useState } from "react";
import axios from "../API/axios";

const Users = () => {
  const [users] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const Controller = new AbortController(); //cancel request when component is unmounted

    const getUsers = async () => {
      try {
        const response = await axios.get("/users", {
          signal: Controller.signal,
        });
        console.log(response.data);
        isMounted && setUsers(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUsers();

    return () => {
      isMounted = false;
      Controller.abort();
    }; // cleanup function to cancel the request

  }, []);

  return (
    <div>
      <h1>User</h1>
      <p>This is the user page</p>
      <article>
        {users?.length ? (
          <ul>
            {users.map((user, i) => (
              <li key={i}> {user?.userName}</li>
            ))}
          </ul>
        ) : (
          <p>No users found</p>
        )}
      </article>
    </div>
  );
};
export default Users;
