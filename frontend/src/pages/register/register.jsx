import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faEnvelope,
  faLock,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../apis/Api";
import "./register.css";
import Navbar from "../../components/Navbar";

const SignUpForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !email || !password || !confirmPassword) {
      toast.error("All fields are required");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (password.length < 8) {
      toast.error("Password should be at least 8 characters");
      return;
    }

    try {
      const response = await registerUser({ username, email, password });
      if (response.data.success) {
        toast.success("Registration successful");
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error(
        err.response
          ? err.response.data.message
          : "Error registering. Please try again."
      );
    }
  };

  return (
    <Form className="mt-4" onSubmit={handleSubmit}>
      <Form.Group className="position-relative mb-3">
        <input
          type="text"
          className="form-control"
          id="uemail"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <FontAwesomeIcon icon={faUser} className="ezy__signup15-icon" />
      </Form.Group>
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
          type="password"
          className="form-control"
          id="pass"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <FontAwesomeIcon icon={faLock} className="ezy__signup15-icon" />
      </Form.Group>
      <Form.Group className="position-relative mb-3">
        <input
          type="password"
          className="form-control"
          id="conPass"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <FontAwesomeIcon icon={faLock} className="ezy__signup15-icon" />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Check>
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            id="remember-me"
            defaultChecked
          />
          <label className="form-check-label" htmlFor="remember-me">
            {" "}
            I agree to all statements in <a href="#!">Terms & Conditions</a>
          </label>
        </Form.Check>
      </Form.Group>

      <Button
        variant=""
        type="submit"
        className="ezy__signup15-btn-submit mt-3"
      >
        Register <FontAwesomeIcon icon={faArrowRight} />
      </Button>
    </Form>
  );
};

const Register = () => {
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
                        <a href="/login">I am already a member</a>
                      </div>
                    </div>
                  </Col>
                  <Col xs={12} md={6} lg={5} className="order-1 mt-4 mt-lg-0">
                    <div className="d-flex flex-column h-100 p-2">
                      <h2 className="ezy__signup15-heading">Sign Up</h2>
                      <SignUpForm />
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

export default Register;
