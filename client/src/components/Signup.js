import react, { useEffect, useState } from 'react'
import '../style.css'
import { Route, Link } from 'react-router-dom';
import { Nav, Navbar, Button, Form, Container, Col, Row, Image, Card } from 'react-bootstrap';
import { useForm } from "react-hook-form"
import Swal from 'sweetalert2'
import Leftlog from './leftlog';
import Rightsignup from './rightsignup';

function Signup() {
  // const [showPassword, setShowPassword] = useState(false);

  // const handlePasswordVisibility = () => {
  //   setShowPassword(!showPassword);
  // };

  //   const {
  //     register,
  //     handleSubmit,
  //     formState,
  //   } = useForm()

  //   const {errors} = formState;

  //   const Submitformdata = async (data) => {
  //     try {
  //       const response = await fetch('/Submitformdata', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },     
  //         body: JSON.stringify(data),
  //       });
  //       console.log(data)
  //       Swal.fire("Registration Successfull");
  //     } catch (error) {
  //       console.error('Registration failed:', error);
  //       Swal.fire("Registration failed!");
  //     }
  //   };


  return (
    <div>
      <Container fluid style={{ backgroundColor: "#cdcece" }}>
        <Row>
          <Col lg={6}>
            <Leftlog />
          </Col>
          <Col lg={6}>
            <Rightsignup />
          </Col>
        </Row>

      </Container>
    </div>
  )
}

export default Signup