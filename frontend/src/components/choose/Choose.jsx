import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import PropTypes from "prop-types";
import personImage from "./person.png";

const features = [
  {
    title: "Practice Tests",
    amount: "50+",
  },
  {
    title: "24/7 Support",
    amount: "Available",
  },
  {
    title: "Success Rate",
    amount: "95%",
  },
];

const FeaturedItem = ({ feature }) => {
  const { title, amount } = feature;
  return (
    <div className="ezy__featured55-info p-3">
      <h4>{amount}</h4>
      <h6>{title}</h6>
    </div>
  );
};

FeaturedItem.propTypes = {
  feature: PropTypes.object.isRequired,
};

const Feature55 = () => {
  return (
    <section className="ezy__featured55 dark-gray">
      <div className="ezy__featured55-shape-one" />
      <div className="ezy__featured55-shape-two" />

      <Container>
        <Row className="justify-content-between">
          <Col xs={12} md={6}>
            <img
              src={personImage}
              alt="IELTS PTE Practice"
              className="img-fluid ezy__featured55-img"
            />
          </Col>
          <Col xs={12} md={6}>
            <h2 className="ezy__featured55-heading mt-5 mt-md-0">
              Why Choose Us?
            </h2>
            <p className="ezy__featured55-sub-heading my-4">
              Achieve your desired scores with comprehensive practice tests and
              resources. Our platform is designed to help you succeed in your
              IELTS and PTE exams with ease.
            </p>
            <Row className="justify-content-around text-center mt-5 pt-5">
              {features.map((feature, i) => (
                <Col xs={4} md={6} lg={4} className="mt-md-3 mt-lg-0" key={i}>
                  <FeaturedItem feature={feature} key={i} />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Feature55;
