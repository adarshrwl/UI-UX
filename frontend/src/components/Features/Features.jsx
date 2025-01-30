import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faTasks,
  faDesktop,
} from "@fortawesome/free-solid-svg-icons";
import practiceImage from "./progress.png";

import classNames from "classnames";

const features = [
  {
    icon: faChartLine,
    title: "Progress Tracking",
    desc: "Monitor your learning progress with detailed analytics and performance insights to help you achieve your goals effectively.",
  },
  {
    icon: faTasks,
    title: "Practice Modules",
    desc: "Engage in targeted practice with our expertly designed modules tailored to improve specific skills and areas of focus.",
  },
  {
    icon: faDesktop,
    title: "Clean and Intuitive Interface",
    desc: "Experience a user-friendly platform designed with simplicity and ease of navigation, ensuring seamless interaction.",
  },
];

const FeatureItem = ({ feature, index }) => {
  return (
    <div
      className={classNames(
        "d-flex ezy__featured21-item position-relative p-3 p-md-4 p-xl-5 mb-3",
        {
          " mt-lg-2": index,
        }
      )}
    >
      <div className="ezy__featured21-icon mb-4 me-4 me-xl-5">
        <FontAwesomeIcon icon={feature.icon} size="2x" />
      </div>
      <div>
        <h4 className="ezy__featured21-title fs-4 mb-3">{feature.title}</h4>
        <p className="ezy__featured21-content mb-0">{feature.desc}</p>
      </div>
    </div>
  );
};

FeatureItem.propTypes = {
  feature: PropTypes.shape({
    icon: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number,
};

const Feature20 = () => {
  return (
    <section className="ezy__featured21 light">
      <Container>
        <Row className="mb-5 text-center justify-content-center">
          <Col lg={7}>
            <h2 className="ezy__featured21-heading mb-4">Our Features</h2>
            <p className="ezy__featured21-sub-heading mb-4">
              Unlock a world of resources designed to boost your IELTS learning
              experience and help you achieve your dream score.
            </p>
          </Col>
        </Row>
        <Row className="pt-md-5">
          <Col lg={6} className="mb-4 mb-lg-0 order-lg-2">
            <div className="ezy__featured21-shape">
              <img
                src={practiceImage}
                alt="Practice Modules"
                className="img-fluid w-100 h-100"
              />
            </div>
          </Col>
          <Col lg={6}>
            <div className="me-lg-4 me-xl-5">
              {features.map((feature, i) => (
                <FeatureItem feature={feature} index={i} key={i} />
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Feature20;
