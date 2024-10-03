import react,{useEffect,useState} from 'react'
import '../style.css'
import { Route,useParams, Link } from 'react-router-dom';
import { Nav,Navbar,Button,Form, Container,Col,Row,Image,Card } from 'react-bootstrap';
import Swal from 'sweetalert2'

function Update(){
    const [uedit,setUedit] = useState({
        name:'', 
        contact:'', 
        dob:'',
    })

    const params = useParams();
    useEffect(() => {
        // console.log(params.id)
        fetch(`/edituserdata/${params.id}`)
            .then(response => response.json())
            .then(uedit => {
                setUedit(uedit);
                // console.log(uedit);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [])

    const handlechange = (e) => {
      const { name, value, files } = e.target;
      if (name === 'profilepicture' || name === 'cover') {
        setUedit({
          ...uedit,
          [name]: files[0],
        });
      } else {
        setUedit({ ...uedit, [name]: value });
        // console.log("usersss:", { ...uedit, [name]: value });
      }
      // console.log("usersss:",uedit);

    };
    


const handleSubmit = async (e) => {
  // console.log("usersss:",uedit);

    // e.preventDefault();
    try {
      const formData1 = new FormData();
      formData1.append('name', uedit.name);
      formData1.append('contact', uedit.contact);
      formData1.append('dob', uedit.dob);
      formData1.append('profilepicture', uedit.profilepicture);
      formData1.append('profilepicture', uedit.cover);
      console.log("profilepicture",formData1)

      const response = await fetch('/updateUser', {
        method: 'POST',
        // body: JSON.stringify(formData1),
        body: formData1,
      });

      if (response.ok) {
        // Handle successful update, e.g., show a success message or redirect to another page
        console.log('User data updated successfully.');
        Swal.fire("Updation Successfull");
      } else {
        // Handle update error, e.g., show an error message
        console.error('Update failed.');
        Swal.fire("Updation failed");
      }
    } catch (error) {
      console.error('Update failed:', error);
      Swal.fire("Updation failed");
    }
  };

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
            <Col  className='bglogin'>
              <div className='login template d-flex justify-content-center align-item-center 100-w vh-110  '>
                <div className='100-w p-5 rounded-5 bg-white loginbox'>
                <Form onSubmit={handleSubmit}>
                    <h3>My Profile</h3>
                    <div className='mb-2'>
                      <label htmlFor="name">Name</label>
                      <input
                        type='name'
                        placeholder='Enter Name'
                        value={uedit.name}
                        name="name"
                        className='form-control'
                        onChange={handlechange}
                      />
                    </div>
                    <div className='mb-2'>
                      <label htmlFor="Mobile">Mobile Number</label>
                      <input
                        type='number'
                        placeholder='Enter Number'
                        value={uedit.contact}
                        name="contact"
                        className='form-control'
                        onChange={handlechange}
                      />
                    </div>
                    <div className='mb-3'>
                      <label htmlFor="dob">Date Of Birth</label>
                      <input
                        type='date'
                        placeholder='Date of Birth'
                        value={uedit.dob}
                        name="dob"
                        className='form-control'
                        onChange={handlechange}
                      />
                    </div>
                    <div className='mb-2'>
                      <label htmlFor="profilepicture">Profile Picture</label>
                      <input
                        type='file'
                        placeholder='Add Profile picture'
                        name="profilepicture"
                        className='form-control'
                        onChange={handlechange}
                      />
                    </div>
                    <div className='mb-2'>
                      <label htmlFor="cover">Cover Picture</label>
                      <input
                        type='file'
                        placeholder='cover'
                        name="cover"
                        className='form-control'
                        onChange={handlechange}
                      />
                    </div>
                    {/* <div className='mb-4'>
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
                      <div className="mb-4 ">
                    <Button variant="danger" type="submit" className="logbtn">
                      Update
                    </Button>
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

export default Update