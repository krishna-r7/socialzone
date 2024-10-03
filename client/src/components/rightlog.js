import reactm, { useState, useEffect } from 'react'
import '../style.css'
import { Route, Link, useNavigate } from 'react-router-dom';
import { Nav, Navbar, Button, Form, Container, Col, Row, Image } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';


export default function Rightlog() {

    const navigate = useNavigate()
    const [login, setLogin] = useState({
        email: '',
        password: ''
    });

    const [showPassword, setShowPassword] = useState(false);


    const handlePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };


    const handleChange = (e) => {
        const { name, value } = e.target
        setLogin({ ...login, [name]: value })
        // console.log(login)
    }


    const Submitlogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/Submitlogin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(login),
            });

            if (response.status === 201) {
                console.log('Login successfully.');
                setLogin({
                    email: "",
                    password: "",
                });
                const data = await response.json();

                if (data.usertype == 0) {
                    console.log(data.usertype)
                    navigate("/Admin")
                    toast.info('Welcome Admin')

                } else if (data.usertype == 1) {
                    console.log(data.usertype)
                    navigate("/Dashboard")
                    // toast.info('Login Successfull')


                }

            } else {
                console.error('Data insertion failed.');
                setLogin({
                    email: "",
                    password: "",
                });
                toast.info('Login Failed')
                // navigate("/login")
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };
    return (
        <>
            <div>
                <Container>
                    <Row>
                        <Col className='vh-100 d-flex justify-content-start align-item-start'>
                            <div className='p-5 rounded-5 bg-white loginbox'>
                                <Form onSubmit={Submitlogin}>
                                    <h2>Login</h2>
                                    <div className='mb-2'>
                                        <label htmlFor="email">Email</label>
                                        <input
                                            type='email'
                                            placeholder='Enter Email'
                                            value={login.email}
                                            name="email"
                                            className='form-control'
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className='mb-4'>
                                        <label htmlFor="password">Password</label>
                                        <input
                                            // type='password'
                                            type={showPassword ? 'text' : 'password'}


                                            placeholder='Enter Password'
                                            value={login.password}
                                            name="password"
                                            className='form-control'
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div class="mb-3 form-check">
                                        <input type="checkbox" class="form-check-input" onChange={handlePasswordVisibility}
                                            checked={showPassword} />
                                        <Row>
                                            <label className="form-check-label d-flex">Check me out</label>
                                        </Row>
                                    </div>
                                    <div className=' d-grid'>
                                        <Button variant='primary' type='submit' className='logbtn'>
                                            Login
                                        </Button>
                                        <hr />
                                    </div>
                                    <div className='mb-3 d-grid'>
                                        <Link to='/Signup' className='logbtn btn btn-success'>
                                            Create New Account
                                        </Link>
                                    </div>
                                </Form>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}