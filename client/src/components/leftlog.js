import React from 'react';
import '../style.css'
import { Nav, Navbar, Button, Form, Container, Col, Row, Image } from 'react-bootstrap';


export default function Leftlog() {
    return (
        <>
            <div>
                <Container fluid>
                    <Row>
                        <Col className='vh-100 d-none d-lg-block'>
                            <Row>
                                <div className='loginh'>
                                    <h1 className='logtitle'>Social<span className='text-primary'>Zone</span></h1>
                                    <p className='logp'>Happening Now</p>
                                </div>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}




