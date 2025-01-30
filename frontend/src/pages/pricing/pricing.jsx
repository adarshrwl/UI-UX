import React, { useState } from "react";
import {
  Button,
  Col,
  Collapse,
  Container,
  Nav,
  Row,
  Tab,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faCheckCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { faCircle } from "@fortawesome/free-regular-svg-icons";
import PropTypes from "prop-types";
import "./Pricing.css";
import Navbar from "../../components/Navbar";

const pricingList = {
  packages: [
    {
      planTitle: "Free",
      price: "NPR 0",
      timeline: "",
      description:
        "Get started with our free plan to explore basic features tailored for your project.",
      features: [
        { isActive: true, label: "Basic Support" },
        { isActive: true, label: "Access to Practice" },
        { isActive: false, label: "Advanced Analytics" },

        { isActive: false, label: "Detailed Performance Reports" },
        { isActive: false, label: "Exclusive Webinars and Workshops" },
      ],
    },
    {
      planTitle: "Monthly Package",
      price: "NPR 1500",
      timeline: "/month",
      description:
        "A flexible monthly plan designed for in-depth learning and collaboration.",
      features: [
        { isActive: true, label: "Full Access" },
        { isActive: true, label: "Priority Support" },
        { isActive: true, label: "Advanced Analytics" },
        { isActive: true, label: "Detailed Performance Reports" },
        { isActive: false, label: "Exclusive Webinars and Workshops" },
      ],
    },
    {
      planTitle: "Yearly Package",
      price: "NPR 10000",
      timeline: "/year",
      description:
        "Save more with our comprehensive yearly plan built for long-term success.",
      features: [
        { isActive: true, label: "Full Access" },
        { isActive: true, label: "Priority Support" },
        { isActive: true, label: "Advanced Analytics" },
        { isActive: true, label: "Detailed Performance Reports" },
        { isActive: true, label: "Exclusive Webinars and Workshops" },
      ],
    },
  ],
};

const PricingTabPane = ({ pricing, eventKey }) => (
  <Tab.Pane className="ezy__pricing9-tab-pane p-3 p-lg-5" eventKey={eventKey}>
    <Nav className="flex-column">
      {pricing.features.map((feature, i) => (
        <Nav.Item className="mb-3" key={i}>
          <FontAwesomeIcon
            icon={feature.isActive ? faCheck : faTimes}
            className="me-2"
          />
          <span className="opacity-75">{feature.label}</span>
        </Nav.Item>
      ))}
    </Nav>
    <Button variant="light" className="w-100 mt-4 ezy__pricing9-btn">
      Choose plan
    </Button>
  </Tab.Pane>
);

PricingTabPane.propTypes = {
  pricing: PropTypes.object.isRequired,
  eventKey: PropTypes.string.isRequired,
};

const PricingTab = ({ pricing, eventKey }) => (
  <Nav.Link
    as="button"
    className="d-flex ezy__pricing9-nav-link px-4 py-5 mb-3"
    eventKey={eventKey}
  >
    <Row as="span" className="align-items-center">
      <Col xs="auto" as="span">
        <FontAwesomeIcon icon={faCircle} />
        <FontAwesomeIcon icon={faCheckCircle} />
      </Col>
      <Col as="span" className="text-start">
        <h3 className="fw-bold mb-2 ezy__pricing9-title">
          {pricing.planTitle}
        </h3>
        <p className="opacity-75 mb-0 ezy__pricing9-note">
          {pricing.description}
        </p>
      </Col>
      <Col xs="auto">
        <span className="ezy__pricing9-price mb-3">
          <span className="fs-3 fw-bold">{pricing.price}</span>
          <span className="ms-2 opacity-75">{pricing.timeline}</span>
        </span>
      </Col>
    </Row>
  </Nav.Link>
);

PricingTab.propTypes = {
  pricing: PropTypes.object.isRequired,
  eventKey: PropTypes.string.isRequired,
};

const Pricing9 = () => {
  return (
    <>
      <Navbar />
      <section className="ezy__pricing9 light">
        <Container>
          <Row className="mb-5">
            <Col lg={6} className="mb-lg-4">
              <h2 className="ezy__pricing9-heading mb-0">
                Best Plan with more facilities and benefit
              </h2>
              <div className="mt-4">
                {/* Additional buttons or info can go here */}
              </div>
            </Col>
          </Row>
          <Tab.Container id="ezy__pricing9-tab" defaultActiveKey={`package-0`}>
            <Row className="align-items-start">
              <Col md={7}>
                <Nav variant="pills" className="flex-column me-md-3">
                  {pricingList.packages.map((pricing, i) => (
                    <PricingTab
                      pricing={pricing}
                      eventKey={`package-${i}`}
                      key={i}
                    />
                  ))}
                </Nav>
              </Col>
              <Col md={5}>
                <Tab.Content>
                  {pricingList.packages.map((pricing, i) => (
                    <PricingTabPane
                      pricing={pricing}
                      eventKey={`package-${i}`}
                      key={i}
                    />
                  ))}
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Container>
      </section>
    </>
  );
};

export default Pricing9;
