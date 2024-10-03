import react,{useState, useEffect} from 'react'
import '../profile.css'
import { Route, Link,useParams } from 'react-router-dom';
import { Nav,Navbar,Button,Form, Container,Col,Row,Image,Modal,Dropdown  } from 'react-bootstrap';
import { FaEllipsisV } from 'react-icons/fa';

function Viewother(){
    const { loginedid } = useParams();
    // console.log(loginedid)
    const [userdata,setuserData] = useState({})
    const [comment, setComment] = useState({comment: ''})
    const [showCommentInput, setShowCommentInput] = useState(false);
    
    const [other, setOther] = useState('');
    const [selectpost, setSelectpost] = useState([])
    console.log();
    const [post, setPost] = useState({
        description: '',
        photo: null,
      });
      // console.log("check",post);

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


   

    

    useEffect(() => {
        console.log("viewppp",loginedid)
        const fetchData = async () => {
            try {
                const response = await fetch(`/Otherview/${loginedid}`);
                const other = await response.json();
                setOther(other);
            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        };
        fetchData();
    }, [loginedid]);


    useEffect(() => { //image fetch------------
        const fetchData = async () => {
          try {
            const response = await fetch(`/Otherposts/${loginedid}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            });
            const post = await response.json();
            // console.log("post await:",post)
            setSelectpost(post.Postdata);
            console.log(post.Postdata)
          } catch (error) {
            console.error('An error occurred:', error);
          }
        };
        fetchData()
      }, [selectpost]);


      //comment-------------------------------
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

        console.log("data of cmnt",data);

        
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
      

      const handlechangecomment = (e) => {
        setComment({ comment: e.target.value });
      };
     
      
//comment end

    

    //---------------------------------------------------------
    useEffect(()=>{ // user seleect
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

      
    //   const handleSubmit = async (e) => {
    //     // console.log("submit")
    //     e.preventDefault();
    //     try {
    //       const formData = new FormData();
    //       formData.append('description', post.description);
    //       formData.append('photo', post.photo);

    //       const currentDate = new Date();
    //       formData.append('time',currentDate.toISOString());
    
    //       const response = await fetch('/addpost', {
    //         method: 'POST',
    //         body: formData,
    //       });
    
    //       if (response.status === 201) {
    //         console.log('Data inserted successfully.');
    //         setPost({
    //           description: '',
    //           photo: null,
    //         });
    //       } else {
    //         console.error('Data insertion failed.');
    //       }
    //     } catch (error) {
    //       console.error('An error occurred:', error);
    //     }
    //   };


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
            <Container className='mt-5'>
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
                                    <Nav className='sidebarnavitem'>
                                        <i class="fas fa-search mt-1"></i> &nbsp;   Search
                                    </Nav>
                                </Nav.Item>
                                <Nav.Item className="sidebarListItem">
                                <Nav className='sidebarnavitem'>
                                  <Link to="/Profile" className='text-decoration-none text-dark'>
                                    <i className="fa-solid fa-user mt-1 text-decoration-none"></i> &nbsp; Profile
                                  </Link>
                                  </Nav>
                                </Nav.Item>   
                                <Nav.Item className="sidebarListItem" onClick={handleLogout}>
                                    <Nav className='sidebarnavitem'>
                                     <i class="fas fa-sign-out mt-1 fw-bold"></i> &nbsp; Logout
                                    </Nav>
                                </Nav.Item>
                                <Nav.Item className="sidebarListItem">
                                    <Nav className='sidebarnavitem'>
                                        <a href="#" className="gradient-buttoncaro2 "  >
                                            Post
                                        </a>
                                    </Nav>
                                </Nav.Item>
                            </div>
                        </Nav>
                    </Col>

                    {/*---------------------------- profile starts------------------------------------------- */}
                    <Col lg={6} className=' mx-auto me-5'>
                        <Row>
                            <div className="profile">
                                <div className="profileRight">
                                    <div className="profileRightTop">
                                        <div className="profileCover">
                                       
                                            <img
                                                className="profileCoverImg"
                                                src={`/uploads/${other.cover}`}
                                                alt=""
                                                
                                            />
                                            <img
                                                className="profileUserImg"
                                                src={`/uploads/${other.profilepicture}`}
                                                alt=""
                                            />
                                          
                                             
                                            {/* <button className="EditButton border mt-3 ">
                                              
                                                <Link to="/Fetchdata" className='text-decoration-none text-dark'>Edit Profile</Link>
                                                
                                            </button> */}
                                       
                                        </div>
                                        <div className="profileInfo">
                                            <h4 className="profileInfoName">{other.name}</h4>
                                         
                                            <span className="profileInfoDesc">Hello my friends!</span> 
                                            
                                           
                                        </div>
                                    </div>
                                 
                                </div>
                            </div>
                        </Row>
                        <Row>
                            {/* ----------------------------------------------Post Bar------------------------------------------------- */}

                            <div className="share mt-3 mb-3">
                                <div className="shareWrapper">
                                    <div className="shareTop">
                                        <Image  src={`/uploads/${other.profilepicture}`} className='shareProfileImg'></Image>
                                        <Form className="searchbarpost">
                                            <Form.Control
                                                type="text"
                                                name='description'
                                                value={userdata.description}
                                                placeholder="What is Happening?!"
                                                className="searchInputpost rounded-5"
                                              
                                            />
                                        </Form>
                                    </div>
                                    <hr className="shareHr" />
                                    <div className="shareBottom">
                                        <div className="shareOptions">
                                    
                                            <div className="shareOption">
                                               
                                                <label htmlFor="fileInput">
                                                    <Image src="/images/photograph.png" className="imgfeed" />
                                                    <span className="shareOptionText ms-2"> Photos</span>
                                                </label>
                                            </div>
                                            <div className="shareOption">

                                                <Image src='/images/tag.png' className='imgfeed d-none d-lg-block '></Image>
                                                <span className="shareOptionText d-none d-lg-block ">Tag</span>
                                            </div>
                                            <div className="shareOption">

                                                <Image src='/images/placeholder.png' className='imgfeed d-none d-lg-block '></Image>
                                                <span className="shareOptionText d-none d-lg-block ">Location</span>
                                            </div>
                                            <div className="shareOption">

                                                <Image src='/images/smile.png' className='imgfeed d-none d-lg-block '></Image>
                                                <span className="shareOptionText d-none d-lg-block ">Stickers</span>
                                            </div>
                                        </div>
                                        <button className="shareButton">Post</button>
                                    </div>
                                </div>
                            </div>
                            {/* -----------------------------postbar ended------------------------------------ */}
                        </Row>
                           {/* -------------------------------------feed start-------------------------------- */}
                        <Row>
                         
                            {selectpost && selectpost.length > 0 ? (
                    selectpost.map((post, index) => (
                  <div className="post mt-1" key={index}>
                    <div className="postWrapper">
                      <div className="postTop">
                        <Col>
                        <div className="postTopLeft">
                          <img className="postProfileImg"
                            src={`/uploads/${other.profilepicture}`}
                            alt="" />
                          <span className="postUsername">
                            <span>{other.name}</span>
                          </span>
                          <span className="postDate d-none d-lg-block"></span>
                        </div>
                        </Col>
                           
                       
                      </div>
                      <div className="postCenter">
                        <span className="postText d-flex">{post.description}</span>
                        <Image src={`/uploads/${post.photo}`} className='postImg img-fluid'></Image>
                      </div>
                      <div>

                        <Row>
                          <Col>
                          <div className='d-flex ms-3'>
                                <div>
                                <Button className='btn btn-light thumbup' onClick={() => handleLikeClick(post.like, post._id)}>
                                    <i className="fa fa-thumbs-o-up"></i> {post.like}
                                  </Button>
                                </div>
                               
                                 
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


                           
                        </Row>
                        {/* -------------------------------------feed end-------------------------------- */}
                    </Col>
            <Col lg={3} className=' d-none d-lg-block mt-3'>
              <div className="birthdayContainer mt-3">
                <img className="birthdayImg" src="/images/gift.png" alt="" />
                <span className="birthdayText">
                  <b>{other.name}</b> and <b>3 other friends</b> have a birthday today.
                </span>
              </div>
              <img className="rightbarAd" src="/images/ad.png" alt="" />

              <hr></hr>
              <h4 className="rightbarTitle mt-5">User information</h4>
              <div className="rightbarInfo">
                <div className="rightbarInfoItem">
                  <span className="rightbarInfoKey">Contact:</span>
                  <span className="rightbarInfoValue">{other.contact}</span>
                </div>
                <div className="rightbarInfoItem">
                  <span className="rightbarInfoKey">Date of Birth:</span>
                  <span className="rightbarInfoValue">{other.dob}</span>
                </div>
               
              </div>
              <h4 className="rightbarTitle">User friends</h4>
              <div className="rightbarFollowings">
                <div className="rightbarFollowing">
                  <img
                    src="/images/1.jpeg"
                    alt=""
                    className="rightbarFollowingImg"
                  />
                  <span className="rightbarFollowingName">John Carter</span>
                </div>
                <div className="rightbarFollowing">
                  <img
                    src="/images/2.jpeg"
                    alt=""
                    className="rightbarFollowingImg"
                  />
                  <span className="rightbarFollowingName">John Carter</span>
                </div>
                <div className="rightbarFollowing">
                  <img
                    src="/images/3.jpeg"
                    alt=""
                    className="rightbarFollowingImg"
                  />
                  <span className="rightbarFollowingName">John Carter</span>
                </div>
                <div className="rightbarFollowing">
                  <img
                    src="/images/6.jpeg"
                    alt=""
                    className="rightbarFollowingImg"
                  />
                  <span className="rightbarFollowingName">John Carter</span>
                </div>
                <div className="rightbarFollowing">
                  <img
                    src="/images/7.jpeg"
                    alt=""
                    className="rightbarFollowingImg"
                  />
                  <span className="rightbarFollowingName">John Carter</span>
                </div>
                <div className="rightbarFollowing">
                  <img
                    src="/images/8.jpeg"
                    alt=""
                    className="rightbarFollowingImg"
                  />
                  <span className="rightbarFollowingName">John Carter</span>
                </div>
              </div>
              <div>
                <p className='mt-3 copyright'>Terms of Service | Privacy Policy | Cookie Policy | More © 2023 Midhun Raj.</p>
              </div>

            </Col>
                </Row>
            </Container>


        </div>
    )
}

export default Viewother