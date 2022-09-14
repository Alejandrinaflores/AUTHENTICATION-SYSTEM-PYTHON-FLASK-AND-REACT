import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { store, actions } = useContext(Context);

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let loginUser = await actions.login(email, password);
    if (loginUser) navigate("/protected");
    else {
      alert("DATA ERROR, CREATE AN ACCOUNT!");
    }
  };
  return (
    <div className="bg-fondo vh-100">
      <h1 className=" text-center pt-3">Login page</h1>
      <div className="d-flex justify-content-center align-items-center h-50 d-inline-block">
        <form onSubmit={handleSubmit} className="col-10 col-md-5">
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label ">
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
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </div>
          <div className="text-center  mt-1">
            <Link to="/signup" className="text-black">
              Create an account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
