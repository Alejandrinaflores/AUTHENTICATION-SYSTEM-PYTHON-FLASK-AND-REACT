import React, { useContext } from "react";
import { Context } from "../store/appContext";

const Protected = () => {
  const { actions } = useContext(Context);
  const logout = () => {
    localStorage.clear();
    actions.deleteTokenLS();
   };

   return (
    <div className="vh-100 bg-fondo">
      <h2>Protected page</h2>
      <button className="btn btn-info" onClick={logout}>
        Log out
      </button>
    </div>
  );
};

export default Protected;