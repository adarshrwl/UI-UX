import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faFacebook,
  faVimeo,
  faDropbox,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import "./footer.css";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="ezy__footer11 gray">
      <Container>
        <Row className="text-center text-md-start">
          {/* Logo & Description Section */}
          <Col xs={12} md={6} xl={5} className="text-left d-md-flex">
            <a href="#" className="ezy__footer11-logo">
              <img src="/eduhub.png" alt="EduHub Logo" className="img-fluid" />
            </a>
            <div className="ezy__footer11-footer-detail ps-4 mt-3 mt-md-0">
              <h3 className="ezy__footer11-heading mb-3">
                Eduhub Learning Platform
              </h3>
              <p className="ezy__footer11-sub-heading mb-0">
                Improve your IELTS & PTE skills with our cutting-edge learning
                platform. Learn from experts and track your progress seamlessly.
              </p>
            </div>
          </Col>

          {/* Social Media Links Section */}
          <Col
            xs={12}
            md={5}
            xl={4}
            className="text-center text-md-start mt-5 mt-md-0"
          >
            <h3 className="ezy__footer11-heading mb-4">Find Us On</h3>
            <ul className="nav ezy__footer11-social-icon d-flex justify-content-center justify-content-md-start mb-0">
              <li>
                <a href="#">
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
              </li>
              <li>
                <a href="#">
                  <FontAwesomeIcon icon={faFacebook} />
                </a>
              </li>
              <li>
                <a href="#">
                  <FontAwesomeIcon icon={faVimeo} />
                </a>
              </li>
              <li>
                <a href="#">
                  <FontAwesomeIcon icon={faDropbox} />
                </a>
              </li>
              <li>
                <a href="#">
                  <FontAwesomeIcon icon={faGithub} />
                </a>
              </li>
            </ul>
          </Col>

          {/* Contact Info Section */}
          <Col
            xs={12}
            md={4}
            xl={3}
            className="text-center text-md-start mt-5 mt-md-0"
          >
            <h3 className="ezy__footer11-heading mb-4">Contact Us</h3>
            <p>Email: info@eduhub.com.np</p>
            <p>Phone: +977 9866752304</p>
            <p
              style={{
                textDecoration: "none",
                color: "inherit",
                margin: 0,
                padding: 0,
              }}
            >
              <Link
                to="/help"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Help Page
              </Link>
            </p>
          </Col>

          {/* Copyright */}
          <Col xs={12} className="text-center mt-5">
            <p className="ezy__footer11-copyright mb-0 mt-md-4">
              &copy; {new Date().getFullYear()} Eduhub. All Rights Reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
