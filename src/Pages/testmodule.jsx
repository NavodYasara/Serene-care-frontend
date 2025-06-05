import React, { useState } from "react";
import axios from "axios";

const Testfunction = () => {
  const [value, setValue] = useState(0);

  const handleClick = () => {
    setValue(value + 1);
  };

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    confPassword: "",
    userType: "",
    mobileNo: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));

    try {
      const response = axios.post(
        "http://localhost:5000/api/user/userRegister",form
      );
      console.log(response.data);
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status === 400) {
          alert("Bad request. Please check your inputs and try again.");
        } else if (error.response.status === 401) {
          alert("Unauthorized. Please check your credentials and try again.");
        } else {
          alert("An error occurred. Please try again later.");
        }
      } else if (error.request) {
        // The request was made but no response was received
        alert("No response from the server. Please try again later.");
      }
    }

    return (
      <>
        <div>
          <h1>Test Function</h1>
          <p>Click the button to increment the value</p>
          <button onClick={handleClick}>
            Click me to increment the value = {value}
          </button>
          <p>{value}</p>

          <input type="text" value={name} onChange={handleChange} />
        </div>
      </>
    );
  };
}
export default Testfunction;
