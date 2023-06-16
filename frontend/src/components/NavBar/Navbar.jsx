import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import assets from "../../assets/index";
import { instance } from "../../axios/axiosConfig";
import useDataContext from "../../hooks/useDataContext";

export default function Navbar() {
  const { userCredentials } = useDataContext();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    instance.get("categories/all").then((res) => setCategories(res.data));
  }, []);

  return (
    <nav className="navbar container">
      <div className="container-fluid d-flex align-items-center justify-content-center justify-content-sm-between">
        <a className="navbar-brand">
          <img
            src={assets.Logo.img}
            alt={assets.Logo.info}
            title={assets.Logo.info}
            style={{ width: "230px" }}
          />
        </a>
        {userCredentials.login === null && (
          <div className="d-flex gap-4">
            <Link
              className="border-0 bg-transparent text-decoration-none text-muted"
              to="/login"
            >
              Iniciar sesion
            </Link>
            <Link
              className="border-0 bg-transparent text-decoration-none text-muted"
              to="/register"
            >
              Registrarse
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
