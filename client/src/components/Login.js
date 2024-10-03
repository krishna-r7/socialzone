import reactm, { useState, useEffect } from 'react'
import '../style.css'
import { Route, Link, useNavigate } from 'react-router-dom';
import { Nav, Navbar, Button, Form, Container, Col, Row, Image } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Leftlog from './leftlog';
import Rightlog from './rightlog';


function Login() {
  return (
    <>
      <div>
        <Container fluid style={{ backgroundColor: "#cdcece" }}>
          <Row>
            <Col lg={6}>
              <Leftlog />
            </Col>
            <Col lg={6}>
             <Rightlog/>
            </Col>
          </Row>

        </Container>
      </div>
    </>

  )
}

export default Login