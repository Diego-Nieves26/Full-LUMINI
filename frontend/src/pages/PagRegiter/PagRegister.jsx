import { motion } from "framer-motion";
import React from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Image,
  Row,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import assets from "../../assets/index";
import { instance } from "../../axios/axiosConfig";
import { alertOk, errorAlert } from "../../components/Alert/Alert";
import "./PagRegister.css";

const animate = {
  "data-aos": "fade-up",
  "data-aos-anchor-placement": "center-bottom",
};

const PagRegister = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const navigate = useNavigate();

  const submit = (data) => {
    const e = {
      email: data.email,
      password: data.password,
    };

    instance
      .post("users/new", data)
      .then((res) => {
        instance
          .post("auth/login", e)
          .then((resLog) => {
            localStorage.setItem("token", resLog.data);
            alertOk(`${res.data.name} te registraste correctamente.`);
            setTimeout(() => {
              navigate("/");
              window.location.reload();
            }, 3200);
          })
          .catch((err) => {
            errorAlert("Ocurrio un error, intenta de nuevo");
          });
        clear();
      })
      .catch((err) => errorAlert("Ocurrio un error, intenta de nuevo"));
  };

  const clear = () => {
    reset({
      name: "",
      surname: "",
      email: "",
      password: "",
    });
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="container mt-lg-5"
    >
      <Container className="register p-3">
        <Row xs={1} lg={2} className="gap-5 pb-5 flex-sm-nowrap">
          <Col>
            <Card.Body
              className="d-flex flex-column align-items-center"
              {...animate}
            >
              <Card.Title>
                <a className="navbar-brand">
                  <Image
                    className="rounded"
                    src={assets.Logo.img}
                    alt={assets.Logo.info}
                    title={assets.Logo.info}
                    style={{ width: "230px" }}
                  />
                </a>
              </Card.Title>
              <Image
                className="rounded img-fluid w-100"
                src={assets.Test02.img}
                alt={assets.Test02.info}
                title={assets.Test02.info}
                style={{ maxWidth: "370px" }}
              />
            </Card.Body>
          </Col>
          <Col>
            <Form onSubmit={handleSubmit(submit)}>
              <Row>
                <Form.Group as={Col} {...animate}>
                  <Form.Label> First Name</Form.Label>
                  <Form.Control
                    {...register("name", {
                      required: true,
                    })}
                    type="text"
                    placeholder="Enter First name"
                  />
                  {errors.name?.type === "required" && (
                    <p>el campo First Name es requerido</p>
                  )}
                </Form.Group>
                <Form.Group as={Col} {...animate}>
                  <Form.Label> Last Name</Form.Label>
                  <Form.Control
                    {...register("surname", {
                      required: true,
                    })}
                    type="text"
                    placeholder="Enter Last name"
                  />
                  {errors.surname?.type === "required" && (
                    <p>el campo Last Name es requerido</p>
                  )}
                </Form.Group>
              </Row>
              <Form.Group as={Col} controlId="formGridEmail" {...animate}>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  {...register("email", {
                    required: true,
                    pattern:
                      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i,
                  })}
                  type="email"
                  placeholder="Enter email"
                />
                {errors.email?.type === "required" && (
                  <p>el campo Email es requerido</p>
                )}
                {errors.email?.type === "pattern" && (
                  <p>El formato del Email es incorrecto</p>
                )}
              </Form.Group>
              <Form.Group as={Col} controlId="formGridPassword" {...animate}>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  {...register("password", {
                    required: true,
                    minLength: 8,
                    maxLength: 15,
                  })}
                  type="password"
                  placeholder="Password"
                />
                {errors.password?.type === "required" && (
                  <p>el campo Password es requerido</p>
                )}
                {errors.password?.type === "minLength" && (
                  <p>debe tener mas de 8 caracteres</p>
                )}
                {errors.password?.type === "maxLength" && (
                  <p>debe tener minimo de 15 caracteres</p>
                )}
              </Form.Group>
              <Button className="my-4" type="submit">
                Register
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </motion.section>
  );
};

export default PagRegister;
