import React from "react";
import { Button, Col, InputGroup, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import BackArrow from "../../Components/BackButton/BackArrow";
import Navigation from "../../Components/Navigation/Navigation";

const AddNewCard = (props) => {
  return (
    <>
      <div className="gray-bg">
        <div className="navbar-section p-0">
          <Navigation />
        </div>
        <div className="main-content pt-4 pr-3 pb-4">
          <p className="page-text dashboard">
            <BackArrow />
          </p>
          <p className="page-maintitle">Add New Card</p>
          <div className="white-bg mt-4 py-5">
            <Row>
              <Col md="2"></Col>
              <Col md="8">
                <Form className="formmain mx-5 mt-4 signin-row">
                  <Row>
                    <Col md="6" className="mt-3">
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="form-label-custom">
                          Card Number
                        </Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Enter Card Number"
                          className="custom-formcontrol"
                        />
                      </Form.Group>
                    </Col>
                    <Col md="6" className="mt-3">
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="form-label-custom">
                          CVV
                        </Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="***"
                          className="custom-formcontrol"
                        />
                      </Form.Group>
                    </Col>
                    <Col md="6" className="mt-3">
                      <Form.Label className="form-label-custom edit-sec">
                        Expiry Date
                      </Form.Label>
                      <InputGroup className="mb-3 edit-border">
                        <Form.Control
                          placeholder="MM/YY"
                          aria-label="Recipient's username"
                          aria-describedby="basic-addon2"
                        />
                      </InputGroup>
                    </Col>
                    <Col md="6" className="mt-3">
                      <Form.Label className="form-label-custom edit-sec">
                        Card Holder Name
                      </Form.Label>
                      <InputGroup className="mb-3 edit-border">
                        <Form.Control
                          placeholder="Enter Name"
                          aria-label="Recipient's username"
                          aria-describedby="basic-addon2"
                        />
                      </InputGroup>
                    </Col>
                  </Row>
                  <Form.Check
                    label="Make it Primary Card"
                    className="custom-check primaryCard"
                  />
                  <div className="text-center">
                    <Button
                      variant="primary"
                      type="submit"
                      className="green-btn mt-3"
                    >
                      Add Card
                    </Button>
                  </div>
                </Form>
              </Col>
              <Col md="2"></Col>
            </Row>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddNewCard;
