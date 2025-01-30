import React, { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import "./help.css";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

const ContactForm = () => {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      alert("Form submitted successfully!");
      // Add form submission logic here, e.g., API call
    }

    setValidated(true);
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Group className="mb-3 mt-2">
        <Form.Control type="text" placeholder="Enter Name" required />
        <Form.Control.Feedback type="invalid">
          Please provide your name.
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3 mt-2">
        <Form.Control type="email" placeholder="Enter Email" required />
        <Form.Control.Feedback type="invalid">
          Please provide a valid email address.
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Enter Message"
          required
        />
        <Form.Control.Feedback type="invalid">
          Please provide a message.
        </Form.Control.Feedback>
      </Form.Group>
      <div className="text-end">
        <Button variant="primary" type="submit" className="ezy__contact11-btn">
          Submit
        </Button>
      </div>
    </Form>
  );
};

const ContactFormCard = () => (
  <Card className="ezy__contact11-form-card">
    <Card.Body className="p-md-5">
      <h2 className="ezy__contact11-heading mb-3">Contact Us</h2>
      <p className="ezy__contact11-sub-heading mb-5">
        We list your menu online, help you process orders.
      </p>

      <ContactForm />
    </Card.Body>
  </Card>
);

const ContactUs11 = () => {
  return (
    <>
      <Navbar />
      <section className="ezy__contact11 light">
        <div
          className="ezy__contact11-bg-holder"
          style={{
            backgroundImage:
              "url(https://cdn.easyfrontend.com/pictures/contact/contact_11.png)",
          }}
        >
          <Container>
            <Row className="py-4 justify-content-between">
              <Col lg={4} className="mb-5 mb-lg-0">
                <h2 className="ezy__contact11-title mb-3 mt-0 text-white">
                  Get in Touch
                </h2>
                <p className="ezy__contact11-sub-heading mb-0 text-white">
                  It’s easier to reach your savings goals when you have the
                  right savings account. Take a look and find the right one for
                  you!
                </p>
              </Col>
              <Col lg={5}>
                <ContactFormCard />
              </Col>
            </Row>
          </Container>
        </div>

        <div className="ezy__contact11-blank-card" />
      </section>
      <Footer />
    </>
  );
};

export default ContactUs11;
