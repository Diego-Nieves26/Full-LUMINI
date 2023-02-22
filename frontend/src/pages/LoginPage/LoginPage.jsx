import { Container, Form, Button, Card } from "react-bootstrap";
import React, { useState } from "react";
import images from "../../assets/index";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const login = (e) => {
    console.log(e);
    clear();
  };

  const animate = {
    "data-aos": "fade-up",
    "data-aos-anchor-placement": "center-bottom",
  };

  const clear = () => {
    reset({
      name: "",
      password: "",
    });
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="container p-0 my-3 h-100 d-flex flex-column align-items-center justify-content-center gap-4"
      style={{ minHeight: "100vh" }}
    >
      <Card.Img className="w-25 h-100 d-sm-none" src={images.Logo.img} />
      <Container className="d-flex flex-column align-items-center justify-content-center flex-sm-row justify-content-sm-around">
        <Card.Img
          className="w-50 h-50"
          src={images.LoginImg.img}
          style={{ maxWidth: "400px" }}
          {...animate}
        />
        <Form
          className="p-5 d-flex gap-3 h-100 flex-column justify-content-center align-items-center"
          onSubmit={handleSubmit(login)}
        >
          <Card.Img
            className="w-100 h-100 mb-4 d-none d-sm-block"
            src={images.Logo.img}
            {...animate}
          />
          <h6>LOGIN</h6>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              {...register("name", {
                required: true,
              })}
              type="text"
              placeholder="Usuario"
              {...animate}
            />
            {errors.name?.type === "required" && (
              <span>No olvides tu usuario.</span>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              {...register("password", {
                required: true,
              })}
              type={showPassword ? "text" : "password"}
              placeholder="Contraseña"
              {...animate}
            />
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value={showPassword}
                id="flexCheckDefault"
                onChange={() => setShowPassword(!showPassword)}
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                Mostrar contraseña
              </label>
            </div>
            {errors.password?.type === "required" && (
              <span>Su contraseña por favor.</span>
            )}
          </Form.Group>
          <Button
            type="submit"
            className="w-75"
            style={{ backgroundColor: "#512C1F" }}
          >
            Iniciar sesion
          </Button>
          <h6>Aun no eres usuario</h6>
          <Button type="submit" className="w-75 bg-secondary">
            <Link className="text-decoration-none text-white" to="/register">
              Registrate
            </Link>
          </Button>
        </Form>
      </Container>
    </motion.section>
  );
}
