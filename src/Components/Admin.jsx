import React from "react";
import { Link } from "react-router-dom";
import User from "./User";


const Admin = () => {
  return (
    <div>
      <section>
        <p>Admin page</p>
        <br />
        <User />
        <p>Your must have been assigned as admin role. </p>
        <div className="flexGrow">
          <Link to="/">Home</Link>
        </div>
      </section>
    </div>
  );
};

export default Admin;
