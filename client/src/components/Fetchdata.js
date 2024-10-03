import react,{useEffect,useState} from 'react'
import '../style.css'
import { Route,useParams, Link } from 'react-router-dom';
import { Nav,Navbar,Button,Form, Container,Col,Row,Image,Card } from 'react-bootstrap';


function Fetchdata(){
    const [userdata,setuserData] = useState({})

    console.log(userdata)
    // const params= useParams();
    useEffect(()=>{
        fetch('/Selectuserdata')
          .then(response => response.json())
          .then(userdata => {
            setuserData(userdata);
            // console.log(userdata);
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
        },[])

        const handleLogout = () => {
          // console.log("logout btn")
          fetch('/logout', { method: 'delete' })
            .then((response) => {
              if (response.status === 200) {
                window.location.href = '/';
              } else {
                console.error('Logout failed.');
              }
            })
            .catch((error) => {
              console.error('Logout failed:', error);
            });
        };

      //   const handlechange=(e)=>{
      //     const {name,value}=e.target
      //     setuserData({...userdata,[name]:value}) 
      //     // console.log(userdata)
      // }


      // const handleSubmit = async (e) => {
      //   // e.preventDefault();
      //   // console.log(userdata)
      //   try {
      //     const response = await fetch("/editupdate", {
      //       method: 'POST',
      //       headers: {
      //         'Content-Type': 'application/json',
      //       },
            
      //       body: JSON.stringify(userdata), 
          
      //     }
      //     );
      //   } catch (error) {
      //     console.error('Registration failed:', error);
      //   }};


    return(
        <div>
            {/* --------------------------------------------Navbar start--------------------------------------------- */}
            <Navbar expand="lg" bg="dark" className='fixed-top' >
                <Container>
                    <Navbar.Brand href="#home" className='text-white fw-bold mb-2'>SocialZone</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Navbar.Collapse className="d-flex justify-content-center">
                            <Form className="searchbar">
                                <Form.Control
                                    type="text"
                                    placeholder="Search for friend, post or video"
                                    className="searchInput rounded-5"
                                />
                            </Form>
                        </Navbar.Collapse>
                        <Nav className="me-auto">
                            {/* <Nav.Link href="#home" className='text-white fw-bold'>Home</Nav.Link> */}
                            <Link to="/Dashboard" className="text-white ms-2 fw-bold text-decoration-none">
                                Home
                            </Link>
                            {/* <Nav.Link href="#home" className=' text-white ms-2 fw-bold'>Profile</Nav.Link> */}
                            <Link to="/Profile" className="text-white ms-3 fw-bold text-decoration-none">
                                Profile
                            </Link>
                        </Nav>
                        <Link type="submit" onClick={handleLogout} className="fw-bold text-white ms-3 text-decoration-none">
                            Logout
                        </Link>
                    </Navbar.Collapse>
                </Container>
            </Navbar>



            {/* --------------------------------------------Navbar End--------------------------------------------- */}
          <Container fluid>
          <Row>
            {/* <Col lg={6} className='bglogin'>
              <Row className='loginh'>
                <h1 className='logtitle'>Social<span className='text-primary'>Zone</span></h1>
                <p className='logp'>Happening Now</p>
              </Row>
            </Col> */}
            <Col  className='bglogin'>
              <div className='login template d-flex justify-content-center align-item-center 100-w vh-110  '>
                <div className='100-w p-5 rounded-5 bg-white loginbox'>
                  <Form >
                    <h3>My Profile</h3>
                    <div className='mb-2'>
                      <label htmlFor="name">Name</label>
                      <input
                        type='name'
                        placeholder='Enter Name'
                        value={userdata.name}
                        name="name"
                        className='form-control'
                        // onChange={handlechange}
                      />
                    </div>
                    <div className='mb-2'>
                      <label htmlFor="Mobile">Mobile Number</label>
                      <input
                        type='number'
                        placeholder='Enter Number'
                        value={userdata.contact}
                        name="contact"
                        className='form-control'
                        // onChange={handlechange}
                      />
                    </div>
                    <div className='mb-3'>
                      <label htmlFor="dob">Date Of Birth</label>
                      <input
                        type='date'
                        placeholder='Date of Birth'
                        value={userdata.dob}
                        name="dob"
                        className='form-control'
                        // onChange={handlechange}
                      />
                    </div>
                    {/* <div className='mb-2'>
                      <label htmlFor="email">Email</label>
                      <input
                        type='email'
                        placeholder='Enter Email'
                        value={userdata.email}
                        name="email"
                        className='form-control'
                        // onChange={handlechange}
                      />
                    </div>
                    <div className='mb-4'>
                      <label htmlFor="password">Password</label>
                      <input
                        type='password'
                        placeholder='Enter Password'
                        // value={form.password}
                        name="password"
                        className='form-control'
                        // onChange={handlechange}
                      />
                    </div> */}
                    <div className='mb-4 '>
                      <Link to={`/Update/${userdata._id}`}>
                        <Button variant='success' type='submit' className='logbtn'>
                          Edit
                        </Button>
                      </Link>

                      
                    
                      {/* <Button variant='danger' type='submit' className='logbtn ms-3'>
                        Delete
                      </Button> */}
                        {/* <td><Link reloadDocument className='btn btn-warning' to={`/Edit/${item._id}`}>Edit</Link></td>  */}
                      <hr />
                    </div>
                  
                  </Form>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
        <footer>
          <div>
            <p className='mt-3 copyright'>Terms of Service | Privacy Policy | Cookie Policy | More © 2023 Midhun Raj.</p>
          </div>
        </footer>
        </div>
    )
}

export default Fetchdata