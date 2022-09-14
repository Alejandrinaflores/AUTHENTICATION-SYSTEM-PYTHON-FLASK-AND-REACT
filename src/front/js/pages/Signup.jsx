import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import Message from "../component/message";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");
  const { actions } = useContext(Context);

  const [message, setMessage] = useState("");
  const [messageError, setMessageError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === password1) {
      e.preventDefault();
      const response = await actions.createUser(email, password);
      if (response) {
        setMessage("User created");
        setTimeout(() => {
          setMessage("");
        }, 3000);
      } else {
        setMessageError("User already exist, please try again!");
        setTimeout(() => {
          setMessageError("");
        }, 3000);
      }
    } else {
      setMessageError("Data error, passwords must match, write them again!");
      setTimeout(() => {
        setMessageError("");
      }, 3000);
    }
  };

  return (
    <div className="vh-100 bg-fondo color-texto">
      <h1 className="text-center pt-4 text-capitalize">Signup page</h1>

      <div className="d-flex justify-content-center align-items-center h-50 d-inline-block">
        <form onSubmit={handleSubmit} className="col-10 col-md-5">
          {message && <Message tipo="alert-correct">{message}</Message>}
          {messageError && (
            <Message tipo="alert-error">{messageError}</Message>
          )}
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email*
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password*
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword2" className="form-label">
              Repeat password*
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword2"
              onChange={(e) => setPassword1(e.target.value)}
            />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Signup
            </button>
          </div>
          <div className="text-center mt-1">
            <Link to="/" className="text-black">
              Already have an account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;