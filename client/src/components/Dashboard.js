import { useEffect, useRef, useState } from 'react';
import { Button, Col, Container, Form, Image, Nav, Navbar, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import '../style.css';

function Dashboard(){
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //------------------------------------------
  const [selectpost, setSelectpost] = useState([])
  // console.log(selectpost)
//cmnt
const [comment, setComment] = useState({comment: ''})
const [showCommentInput, setShowCommentInput] = useState(false);
const [search, setSearch] = useState('')

// console.log("searcheddata",search)
// console.log("Cmnt",comment)
//cmnt
  const [post, setPost] = useState({
    description: '',
    photo: null,
  });

  
// console.log("post",post)
  //-----------------------like---------------------------
  const { loginid } = useParams();
  const a = 0;
  const [like, setLike] = useState(a);
  // console.log(like)
  const [hasIncremented, setHasIncremented] = useState(false);

  const handleLikeClick = (clike,pid) => {
    if (!hasIncremented) {
      setLike(clike + 1);
      setHasIncremented(true);
      // console.log("datalike",data)
     const data = {clike : clike , pid:pid}
      fetch('/like', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      console.log(clike)
      console.log(pid)
    }
  };

  const searchInputRef = useRef(null);

  const handleSearchClick = () => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };




  useEffect(() => {
    if (hasIncremented && loginid) {
      const data = {
        loginid: loginid,
        like: like + 1,
        
      };
      console.log("datalike",data)
      fetch('/like', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then(response => {
          if (response.ok) {
            console.log('Like inserted successfully.');
          } else {
            throw new Error('Failed to update like count');
          }
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [like, hasIncremented, loginid]);

//...............................like ended

//.....................Comment
const toggleCommentInput = () => {
  setShowCommentInput(!showCommentInput);
};

const handleCommentSubmit = async (postid, commentText) => {
  // console.log('postid:', postid);
  // console.log('commentText:', commentText);

  const data = {
    postid: postid,
    comment: comment.comment,
  };

  try {
    const response = await fetch('/commentuserdata', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      const data = await response.json();
      console.log('Comment submitted:', data);
      // You can perform additional actions here if needed
    } else {
      console.error('Comment submission failed:', response.statusText);
      // Handle non-successful responses, e.g., displaying an error message
    }
  } catch (error) {
    console.error('Comment submission failed:', error);
    // Handle network errors or exceptions
  }
};

// const handleClose = () => {
//   setShow(false);
// };

const handlechangecomment = (e) => {
  setComment({ comment: e.target.value });
};

//.....................Comment ended

//................Search.................


const filterdata = selectpost?.filter((searchitem) => { 
  // console.log("wor", searchitem);
  if (searchitem.userName && search) {
    // Check if searchitem.name is defined and non-empty
    if (typeof searchitem.userName === 'string') {
      return searchitem.userName.toLowerCase().includes(search.toLowerCase());
    }
  }
  return false;
});










//................Search Ended.................







  useEffect(() => {
    // console.log(post); // Access the updated post state here
  }, [post]);

  
  const handlechange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'photo') {//input field type="file"   name attribute is photo
      setPost({
        ...post,
        [name]: files[0], // Use the selected file
      });
    } else {
      setPost({
        ...post,
        [name]: value,
      });
    }
    // console.log(post);
  };


  const handleSubmit = async (e) => {
    // console.log("submit")
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('description', post.description);
      formData.append('photo', post.photo);

      const currentDate = new Date();
      formData.append('time',currentDate.toISOString());

      const response = await fetch('/addpost', {
        method: 'POST',
        body: formData,
      });

      if (response.status === 201) {
        console.log('Data inserted successfully.');
        setPost({
          description: '',
          photo: null,
        });
      } else {
        console.error('Data insertion failed.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };
  useEffect(() => { //image fetch------------
    const fetchData = async () => {
      try {
        const response = await fetch('/Dashboard', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const post = await response.json();
        // console.log("post await:",post)
        setSelectpost(post.Postdata);
        // console.log(post.Postdata)
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };
    fetchData()
  }, []);

 


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
      {/* <Navbar expand="lg" bg="dark" className='fixed-top' >
      <Container>
        <Navbar.Brand href="#home" className='text-white fw-bold mb-2'>SocialZone</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Navbar.Collapse className="d-flex justify-content-center">
          <Form className="searchbar">
            <Form.Control
              type="text"
              name="search"
              placeholder="Search for friend, post or video"
              className="searchInput rounded-5"
              onChange={(e) => setSearch(e.target.value)}
              ref={searchInputRef}
            />
          </Form>
        </Navbar.Collapse>
        <Nav className="me-auto">
        <Link to="/Dashboard" className="text-white ms-2 mt-1 fw-bold text-decoration-none">
                                Home
                            </Link>
           
                <Link to="/Profile" reloadDocument className="text-white ms-2 fw-bold mt-1 text-decoration-none">
                  Profile
                </Link>
          </Nav>
          <Link type="submit" onClick={handleLogout} className="fw-bold text-white ms-2 mt-1 text-decoration-none">
          Logout
      </Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>

     */}

<Navbar expand="lg" bg="dark" className='fixed-top' >
                <Container>
                    <Navbar.Brand href="#home" className='text-white fw-bold mb-2'>SocialZone</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Navbar.Collapse className="d-flex justify-content-center">
                <Form className="searchbar">
                  <Form.Control
                    type="text"
                    name="search"
                    placeholder="Search for friend, post or video"
                    className="searchInput rounded-5"
                    onChange={(e) => setSearch(e.target.value)}
                    ref={searchInputRef}
                  />
                </Form>
                        </Navbar.Collapse>
                        <Nav className="me-auto">
                            {/* <Nav.Link href="#home" className='text-white fw-bold'>Home</Nav.Link> */}
                            <Link to="/Dashboard" reloadDocument className="text-white ms-2 fw-bold text-decoration-none">
                                Home
                            </Link>
                            {/* <Nav.Link href="#home" className=' text-white ms-2 fw-bold'>Profile</Nav.Link> */}
                            <Link to="/Profile" reloadDocument className="text-white ms-3 fw-bold text-decoration-none">
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
      <Container  className='mt-5'>
                <Row>
                    <Col lg={3} className='bg d-none d-lg-block'>
                        <Nav className='sidebar fixed-left'>
                            <div className='sidebarWrapper'>
                                <Nav.Item className="sidebarListItem">
                                    <Nav className='sidebarnavitem mt-5 '>
                                    <Link to="/Dashboard" className='text-decoration-none text-dark'>
                                    <i class="fa-solid fa-house mt-1"></i> &nbsp;Home
                                    </Link>
                                    </Nav>
                                </Nav.Item>
                                
                                <Nav.Item className="sidebarListItem">
                                    <Nav className='sidebarnavitem' onClick={handleSearchClick}>
                                    <i class="fas fa-search mt-1"></i> &nbsp;   Search
                                    </Nav>
                                </Nav.Item>
                                {/* <Nav.Item className="sidebarListItem">
                                    <Nav className='sidebarnavitem'>
                                    <i class="fa-solid fa-bell mt-1"></i> &nbsp;   Notifications
                                    </Nav>
                                </Nav.Item> */}
                                <Nav.Item className="sidebarListItem">
                                <Nav className='sidebarnavitem'>
                                  <Link to="/Profile" className='text-decoration-none text-dark'>
                                    <i className="fa-solid fa-user mt-1 text-decoration-none"></i> &nbsp; Profile
                                  </Link>
                                  </Nav>
                                </Nav.Item>
                                {/* <Nav.Item className="sidebarListItem">
                                    <Nav className='sidebarnavitem'>
                                    <i class="fa-solid fa-message mt-1"></i> &nbsp;  Message
                                    </Nav>
                                </Nav.Item> */}
                              <Nav.Item className="sidebarListItem" onClick={handleLogout}>
                                <Nav className='sidebarnavitem'>
                                  <i class="fas fa-sign-out mt-1 fw-bold"></i> &nbsp; Logout
                                </Nav>
                              </Nav.Item>
                                <Nav.Item className="sidebarListItem">
                                    <Nav className='sidebarnavitem'>
                                    <a href="#" className="gradient-buttoncaro2 " onClick={handleSubmit}>
                                     Post
                                    </a>
                                    </Nav>
                                </Nav.Item>
                                
                            </div>
                        </Nav>
                    </Col>
                    <Col lg={6} className=' mx-auto me-5'>
                   <Row className='postrow mt-3'>
                    <Col>

{/* ----------------------------------------------Post Bar------------------------------------------------- */}

                  <div className="share mt-3">
                    <div className="shareWrapper">
                      <div className="shareTop">
                        <Image src='./images/cc.png' className='shareProfileImg'></Image>
                        <Form className="searchbarpost">
                          <Form.Control
                            type="text"
                            name='description'
                            value={post.description}
                            placeholder="What is Happening?!"
                            className="searchInputpost rounded-5"
                            onChange={handlechange}
                          />
                        </Form>
                      </div>
                      <hr className="shareHr" />
                      <div className="shareBottom">
                        <div className="shareOptions">
                          {/* <div className="shareOption">
                            <Image src='./images/photograph.png' className='imgfeed'></Image>
                            <span className="shareOptionText"> Photoes</span>
                          </div> */}
                             <div className="shareOption">
                                                <input
                                                    type="file"
                                                    name="photo"
                                                    id="fileInput"
                                                    accept="image/*"
                                                    // style={{ display: "none" }}
                                                    style={{ width:"30px" }}
                                                    className='invisible'
                                                onChange={handlechange} 
                                                />
                                                <label htmlFor="fileInput">
                                                    <Image src="./images/photograph.png" className="imgfeed" />
                                                    <span className="shareOptionText ms-1"> Photos</span>
                                                </label>
                                            </div>
                          <div className="shareOption">
                           
                            <Image src='./images/tag.png' className='imgfeed d-none d-lg-block '></Image>
                            <span className="shareOptionText d-none d-lg-block ">Tag</span>
                          </div>
                          <div className="shareOption">
                          
                            <Image src='./images/placeholder.png' className='imgfeed d-none d-lg-block '></Image>
                            <span className="shareOptionText d-none d-lg-block ">Location</span>
                          </div>
                          <div className="shareOption">
                            <Image src='./images/smile.png' className='imgfeed d-none d-lg-block '></Image>
                            <span className="shareOptionText d-none d-lg-block "> Stickers</span>
                          </div>
                        </div>
                        <button className="shareButton" onClick={handleSubmit}>Post</button>
                      </div>
                    </div>
                  </div>
                  {/* -----------------------------postbar ended------------------------------------ */}

                  {/* -------------------------------------feed start-------------------------------- */}
                  
   
              {/* Filter dashboard */}
                    {filterdata.map((post, index) => (
                      <div className="post" key={index}>
                        <div className="postWrapper">
                          <div className="postTop">
                            <div className="postTopLeft">
                              <img
                                className="postProfileImg"

                                src={`./uploads/${post.profilepicture}`}
                                alt=""
                              />
                              <span className="postUsername">
                                <span className='postusern'>{post.userName}</span>
                              </span>
                              <span className="postDate text-secondary">{post.currentdate}</span>
                            </div>
                          </div>
                          <div className="postCenter">
                            <span className="postText d-flex">{post.description}</span>
                            <Image src={`./uploads/${post.photo}`} className='postImg img-fluid'></Image>
                          </div>
                          <div >

                            <Row>
                              <Col>
                              <Row>
                                
                              </Row>
                                <div className='d-flex ms-3'>
                                <div>
                                <Button className='btn btn-light thumbup' reloadDocument onClick={() => handleLikeClick(post.like, post._id)}>
                                    <i className="fa fa-thumbs-o-up"></i> {post.like}
                                  </Button>
                                </div>
                                  
                                  <div>
                                    <Form>
                                      <Button variant="light" className="d-flex ms-2" onClick={toggleCommentInput} >
                                        Comment
                                      </Button>
                                      
                                    </Form>
                                  </div>  
                                                                 
                                  </div>
                              <Form>
                              {showCommentInput && (
                                  <Container className='mb-2'>
                                    <Row className='mt-2'>
                                      <Col lg={10}>
                                        <input
                                          type="text"
                                          value={comment.comment}
                                          onChange={handlechangecomment}
                                          name="comment"
                                          className="form-control rounded-5"
                                          placeholder="Add a comment..."
                                        />
                                      </Col>
                                      <Col lg={2}>
                                        <Button
                                          type="submit"
                                          variant="secondary"
                                          size="sm"
                                          className="rounded-5 d-flex mt-1 fw-bold"
                                          onClick={() => handleCommentSubmit(post._id, comment.comment)}
                                        >
                                          Comment
                                        </Button>
                                      </Col>
                                      <Container style={{ height: '90px', overflowY: 'scroll', overflowX: 'hidden' }} className=''>
                                        <Row>
                                    
                                       
                                            <div>

                                              <div className="comments">
                                                {post.comments.map((comment, index) => (
                                                  <div key={index} className="cmntbg rounded-3">
                                                    
                                                    <p className="text-start mt-2 ms-3 ">{comment.comment}</p>
                                                  </div>
                                                ))}
                                              </div>
                                            </div>
                                        </Row>
                                      </Container>
                                    </Row>
                                  </Container>
                                )}
                              </Form>
                              </Col>
                            </Row>

                          </div>
                        </div>
                      </div>
                    ))}
                     {/* Filter dashboard  ended*/}
                      




                  
                  {selectpost && selectpost.length > 0 ? (
                    selectpost.map((post, index) => (
                      <div className="post" key={index}>
                        <div className="postWrapper">
                          <div className="postTop">
                            <div className="postTopLeft">
                              <img
                                className="postProfileImg"

                                src={`./uploads/${post.profilepicture}`}
                                alt=""
                              />
                              <span className="postUsername">
                                <Link to={`/Viewother/${post.loginedid}`}  className='text-decoration-none text-dark'>
                                <span className='postusern'>{post.userName}</span>
                                </Link>
                               
                              </span>
                              <span className="postDate text-secondary">{post.currentdate}</span>
                              {/* <span className="postDate">{post.time} </span> */}
                            </div>
                          </div>
                          <div className="postCenter">
                            <span className="postText d-flex">{post.description}</span>
                            <Image src={`./uploads/${post.photo}`} className='postImg img-fluid'></Image>
                          </div>
                          <div >

                            <Row>
                              <Col>
                              <Row>
                                
                              </Row>
                                <div className='d-flex ms-3'>
                                <div>
                                <Button className='btn btn-light thumbup' onClick={() => handleLikeClick(post.like, post._id)}>
                                    <i className="fa fa-thumbs-o-up"></i> {post.like}
                                  </Button>
                                </div>
                                  {/* <Button className='btn btn-light thumbup'><i class="fa fa-thumbs-o-up"></i> Like</Button> */}
                                 
                                  {/*---------------------- comment---------------------------- */}
                                  <div>
                                    <Form>
                                      <Button variant="light" className="d-flex ms-2" onClick={toggleCommentInput} >
                                        Comment
                                      </Button>
                                      
                                    </Form>
                                  </div>  
                                                                 
                                  </div>
                              <Form>
                              {showCommentInput && (
                                  <Container className='mb-2'>
                                    <Row className='mt-2'>
                                      <Col lg={10}>
                                        <input
                                          type="text"
                                          value={comment.comment}
                                          onChange={handlechangecomment}
                                          name="comment"
                                          className="form-control rounded-5"
                                          placeholder="Add a comment..."
                                        />
                                      </Col>
                                      <Col lg={2}>
                                        <Button
                                          type="submit"
                                          variant="secondary"
                                          size="sm"
                                          className="rounded-5 d-flex mt-1 fw-bold"
                                          onClick={() => handleCommentSubmit(post._id, comment.comment)}
                                        >
                                          Comment
                                        </Button>
                                      </Col>
                                      <Container style={{ height: '90px', overflowY: 'scroll', overflowX: 'hidden' }} className=''>
                                        <Row>
                                    
                                       
                                            <div>

                                              <div className="comments">
                                                {post.comments.map((comment, index) => (
                                                  <div key={index} className="cmntbg rounded-3">
                                                    {/* <span className=' d-flex ms-3 cmntname'>{post.userName}</span> */}
                                                    <p className="text-start mt-2 ms-3 ">{comment.comment}</p>
                                                  </div>
                                                ))}
                                              </div>
                                            </div>
                                        </Row>
                                      </Container>
                                    </Row>
                                  </Container>
                                )}
                              </Form>
                              </Col>
                            </Row>

                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No posts available</p>
                  )}
                      
      
                

                    {/* -------------------------------------feed end-------------------------------- */}

                

                     
                    </Col>
                   </Row> 
                    </Col>
            <Col lg={3} className=' d-none d-lg-block mt-3'>
            <div className="birthdayContainer mt-3">
                            <img className="birthdayImg" src="./images/gift.png" alt="" />
                            <span className="birthdayText">
                                <b>Pola Foster</b> and <b>3 other friends</b> have a birthday today.
                            </span>
                        </div>
                        <img className="rightbarAd" src="./images/ad.png" alt="" />
              <div className="rightContainer">
                {/* <Row className='mt-4'>
                  <Form className="searchbarright">
                    <Form.Control
                      type="text"
                      placeholder="Search"
                      className="searchInputright rounded-5"
                    />
                  </Form>
                </Row> */}
                </div>
                <Row className='bg1'>
                  <div className='rightbox'>
                    <div className='rightwrapper'>
                      <h5 className='text-start fw-bold'>&nbsp;Subscribe to Premium</h5>
                      <p className='text-start fw-bold'> Subscribe to unlock new features and if eligible, receive a share of ads revenue.</p>
                      <a href="#" className=" buttonrightbar">Subscribe</a>
                    </div>
                  </div>

                </Row>
                <div>
                  <p className='mt-3 copyright'>Terms of Service | Privacy Policy | Cookie Policy | More © 2023 Midhun Raj.</p>
                </div>
              
            </Col>
                </Row>
            </Container>

        </div>
    )
}

export default Dashboard