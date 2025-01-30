import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAward,
  faGraduationCap,
  faRibbon,
  faTrophy,
} from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import "./about.css";

const stories = [
  {
    icon: faAward,
    title: "Trusted by Thousands of Students",
  },
  {
    icon: faGraduationCap,
    title: "300+ Successful Graduates",
  },
  {
    icon: faTrophy,
    title: "Recognized Excellence in Education",
  },
  {
    icon: faRibbon,
    title: "Award-Winning Learning Platform",
  },
];

const StoryItem = ({ item }) => {
  const { title, icon } = item;
  return (
    <div className="d-flex align-items-center justify-content-center justify-content-md-start mt-5">
      <FontAwesomeIcon icon={icon} className="ezy__about17-icon me-3" />
      <h6 className="mb-0">{title}</h6>
    </div>
  );
};

StoryItem.propTypes = {
  item: PropTypes.object.isRequired,
};

const ShapeOne = () => (
  <>
    <svg
      className="ezy__about17-shape-one position-absolute"
      width="499"
      height="499"
      viewBox="0 0 600 600"
      fill="var(--ezy-body-color-invert)"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="249.5"
        cy="249.5"
        r="249.5"
        fill="var(--ezy-body-color-invert)"
        fillOpacity="1"
      />
    </svg>
    <img
      src="https://cdn.easyfrontend.com/pictures/quiz_1.png"
      alt=""
      className="img-fluid"
    />
  </>
);

const ShapeTwo = () => (
  <svg
    className="ezy__about17-shape-two position-absolute"
    width="134"
    height="133"
    viewBox="0 0 134 133"
    fill="var(--ezy-body-color-invert)"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M66.9999 133C104.003 133 134 103.227 134 66.5C134 29.773 104.003 0 66.9999 0C29.9968 0 0 29.773 0 66.5C0 103.227 29.9968 133 66.9999 133Z"
      fill="var(--ezy-body-color-invert)"
      fillOpacity="1"
    />
  </svg>
);

const ShapeThree = () => (
  <svg
    className="ezy__about17-shape-three position-absolute"
    width="223"
    height="262"
    viewBox="0 0 223 262"
    fill="var(--ezy-body-color-invert)"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M212.555 100.254C224.477 169.763 239.522 246.47 170.132 258.373C100.741 270.275 36.3657 251.51 24.443 182C12.5203 112.491 -30.8157 14.839 38.5748 2.93669C107.965 -8.96565 200.632 30.7447 212.555 100.254Z"
      fill="var(--ezy-body-color-invert)"
      fillOpacity="0.8"
    />
  </svg>
);

const ShapeFour = () => (
  <svg
    className="ezy__about17-shape-four position-absolute"
    width="155"
    height="166"
    viewBox="0 0 155 166"
    fill="var(--ezy-body-color-invert)"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M141.003 54.264C153.758 98.3055 169.054 146.771 125.088 159.504C81.1214 172.237 38.1659 164.793 25.4108 120.751C12.6556 76.7097 -22.4405 16.769 21.5258 4.03561C65.4921 -8.69781 128.248 10.2226 141.003 54.264Z"
      fill="var(--ezy-body-color-invert)"
      fillOpacity="0.8"
    />
  </svg>
);

const AboutUs17 = () => {
  return (
    <section className="ezy__about17 light">
      <ShapeThree />
      <ShapeFour />

      <Container>
        <Row className="justify-content-between">
          <Col xs={12} md={5}>
            <div className="position-relative">
              <ShapeOne />
              <ShapeTwo />
            </div>
          </Col>
          <Col xs={12} md={6} className="me-md-4">
            <div>
              <h2 className="ezy__about17-heading">About Eduhub</h2>
              <p className="ezy__about17-sub-heading my-4 pe-lg-5">
                Eduhub is dedicated to empowering students with top-notch
                resources and guidance to achieve their dreams. Our platform
                bridges the gap between learning and success through innovative
                educational tools, an engaging curriculum, and expert
                mentorship. We are proud to be a trusted partner in your
                academic journey.
              </p>
              <div className="ezy__about17-cards">
                {stories.map((item, i) => (
                  <StoryItem item={item} key={i} />
                ))}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AboutUs17;
