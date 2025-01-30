import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faEnvelope,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../apis/Api";

import Navbar from "../../components/Navbar";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("All fields are required");
      return;
    }

    try {
      const response = await loginUser({ email, password });

      if (response.data.success) {
        localStorage.setItem("userData", response.data.userData.username);
        localStorage.setItem("token", response.data.token);

        toast.success("Login successful");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error(
        err.response
          ? err.response.data.message
          : "Error logging in. Please try again."
      );
    }
  };

  return (
    <Form className="mt-4" onSubmit={handleSubmit}>
      <Form.Group className="position-relative mb-3">
        <input
          type="email"
          className="form-control"
          id="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FontAwesomeIcon icon={faEnvelope} className="ezy__signup15-icon" />
      </Form.Group>
      <Form.Group className="position-relative mb-3">
        <input
          type={showPassword ? "text" : "password"}
          className="form-control"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <FontAwesomeIcon icon={faLock} className="ezy__signup15-icon" />
        <span
          className="eye-icon"
          onClick={() => setShowPassword(!showPassword)}
        >
          <FontAwesomeIcon icon={showPassword ? "fa-eye" : "fa-eye-slash"} />
        </span>
      </Form.Group>

      <Button
        variant=""
        type="submit"
        className="ezy__signup15-btn-submit mt-3"
      >
        Login <FontAwesomeIcon icon={faArrowRight} />
      </Button>
    </Form>
  );
};

const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <section className="ezy__signup15 light d-flex align-items-center justify-content-center">
        <Container>
          <Row className="justify-content-center">
            <Col xs={12} md={8}>
              <div className="ezy__signup15-form-card p-4 p-lg-5">
                <Row className="justify-content-between">
                  <Col xs={12} md={6} className="order-2">
                    <div className="d-flex flex-column align-items-center justify-content-center h-100 mt-5 mt-lg-0">
                      <img
                        src="https://cdn.easyfrontend.com/pictures/sign-in-up/abstract1.png"
                        alt=""
                      />
                      <div className="text-center mt-5">
                        <a href="#!" onClick={() => navigate("/register")}>
                          Don't have an account? Sign up
                        </a>
                      </div>
                    </div>
                  </Col>
                  <Col xs={12} md={6} lg={5} className="order-1 mt-4 mt-lg-0">
                    <div className="d-flex flex-column h-100 p-2">
                      <h2 className="ezy__signup15-heading">Login</h2>
                      <LoginForm />
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default LoginPage;
