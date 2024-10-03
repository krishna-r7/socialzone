import react,{useEffect, useState} from 'react'

import { Route, Link } from 'react-router-dom';
import { Nav,Navbar,Button,Form, Container,Col,Row,Image } from 'react-bootstrap';


function Admintable(){
  const [viewdata,setviewData] = useState([])
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    // Filter the viewdata based on the searchQuery
    const filteredData = viewdata.filter(
      item =>
        item.name.includes(searchQuery) || item.contact.includes(searchQuery)
    );
    setviewData(filteredData);
  };

    // console.log(viewdata)

    useEffect(()=>{
        fetch('/Adminviewuserdata')
          .then(response => response.json())
          .then(viewdata => {
            setviewData(viewdata);
            // console.log(viewdata);
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


         //Delete Userdata (ADMIN)----------------------------------
         const handleDelete = async (id) => {
         
          try {
            const response = await fetch(`/adminuserdelete/${id}`, {
              method: 'DELETE',
            });
        
            if (response.ok) {
              const data = await response.json();
              console.log('Admin Delete Successful:', data);
              fetchData();
            } else {
              console.error('Error deleting post:', response.status);
            }
          } catch (error) {
            console.error('Network error:', error);
          }
        };

    return(
        <div>
        <>
  <title>Datta Able Free Bootstrap 4 Admin Template</title>
  {/* HTML5 Shim and Respond.js IE10 support of HTML5 elements and media queries */}
  {/* WARNING: Respond.js doesn't work if you view the page via file:// */}
  {/*[if lt IE 10]>
		
		
		<![endif]*/}
  {/* Meta */}
  <meta charSet="utf-8" />
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0, user-scalable=0, minimal-ui"
  />
  <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
  <meta
    name="description"
    content="Datta Able Bootstrap admin template made using Bootstrap 4 and it has huge amount of ready made feature, UI components, pages which completely fulfills any dashboard needs."
  />
  <meta
    name="keywords"
    content="admin templates, bootstrap admin templates, bootstrap 4, dashboard, dashboard templets, sass admin templets, html admin templates, responsive, bootstrap admin templates free download,premium bootstrap admin templates, datta able, datta able bootstrap admin template, free admin theme, free dashboard template"
  />
  <meta name="author" content="CodedThemes" />
  {/* Favicon icon */}
  <link rel="icon" href="assets/images/favicon.ico" type="image/x-icon" />
  {/* fontawesome icon */}
  <link
    rel="stylesheet"
    href="assets/fonts/fontawesome/css/fontawesome-all.min.css"
  />
  {/* animation css */}
  <link rel="stylesheet" href="assets/plugins/animation/css/animate.min.css" />
  {/* vendor css */}
  <link rel="stylesheet" href="assets/css/style.css" />
  {/* [ Pre-loader ] start */}
  <div className="loader-bg">
    <div className="loader-track">
      <div className="loader-fill" />
    </div>
  </div>
  {/* [ Pre-loader ] End */}
  {/* [ navigation menu ] start */}
  <nav className="pcoded-navbar">
    <div className="navbar-wrapper">
      <div className="navbar-brand header-logo">
        <a href="index.html" className="b-brand">
          <div className="b-bg">
            <i className="feather icon-trending-up" />
          </div>
          <span className="b-title">Admin</span>
        </a>
        <a className="mobile-menu" id="mobile-collapse" href="javascript:">
          <span />
        </a>
      </div>
      <div className="navbar-content scroll-div">
        <ul className="nav pcoded-inner-navbar">
          {/* <li className="nav-item pcoded-menu-caption">
            <label>Navigation</label>
          </li>
          <li
            data-username="dashboard Default Ecommerce CRM Analytics Crypto Project"
            className="nav-item"
          >
            <a href="index.html" className="nav-link ">
              <span className="pcoded-micon">
                <i className="feather icon-home" />
              </span>
              <span className="pcoded-mtext">Dashboard</span>
            </a>
          </li> */}
          {/* <li className="nav-item pcoded-menu-caption">
            <label>UI Element</label>
          </li> */}
          <li
            data-username="basic components Button Alert Badges breadcrumb Paggination progress Tooltip popovers Carousel Cards Collapse Tabs pills Modal Grid System Typography Extra Shadows Embeds"
            className="nav-item pcoded-hasmenu"
          >
            {/* <a href="javascript:" className="nav-link ">
              <span className="pcoded-micon">
                <i className="feather icon-box" />
              </span>
              <span className="pcoded-mtext">Components</span>
            </a> */}
            {/* <ul className="pcoded-submenu">
              <li className="">
                <a href="bc_button.html" className="">
                  Button
                </a>
              </li>
              <li className="">
                <a href="bc_badges.html" className="">
                  Badges
                </a>
              </li>
              <li className="">
                <a href="bc_breadcrumb-pagination.html" className="">
                  Breadcrumb &amp; paggination
                </a>
              </li>
              <li className="">
                <a href="bc_collapse.html" className="">
                  Collapse
                </a>
              </li>
              <li className="">
                <a href="bc_tabs.html" className="">
                  Tabs &amp; pills
                </a>
              </li>
              <li className="">
                <a href="bc_typography.html" className="">
                  Typography
                </a>
              </li>
              <li className="">
                <a href="icon-feather.html" className="">
                  Feather
                  <span className="pcoded-badge label label-danger">NEW</span>
                </a>
              </li>
            </ul> */}
          </li>
          <li className="nav-item pcoded-menu-caption">
            <label>Forms &amp; table</label>
          </li>
       
          <li
            data-username="Table bootstrap datatable footable"
            className="nav-item active"
          >
            <a href="tbl_bootstrap.html" className="nav-link ">
              <span className="pcoded-micon">
                <i className="feather icon-server" />
              </span>
              <span className="pcoded-mtext">Table</span>
            </a>
          </li>
          {/* <li className="nav-item pcoded-menu-caption">
            <label>Chart &amp; Maps</label>
          </li>
          <li data-username="Charts Morris" className="nav-item">
            <a href="chart-morris.html" className="nav-link ">
              <span className="pcoded-micon">
                <i className="feather icon-pie-chart" />
              </span>
              <span className="pcoded-mtext">Chart</span>
            </a>
          </li>
          <li data-username="Maps Google" className="nav-item">
            <a href="map-google.html" className="nav-link ">
              <span className="pcoded-micon">
                <i className="feather icon-map" />
              </span>
              <span className="pcoded-mtext">Maps</span>
            </a>
          </li>
          <li className="nav-item pcoded-menu-caption">
            <label>Pages</label>
          </li>
          <li
            data-username="Authentication Sign up Sign in reset password Change password Personal information profile settings map form subscribe"
            className="nav-item pcoded-hasmenu"
          >
            <a href="javascript:" className="nav-link ">
              <span className="pcoded-micon">
                <i className="feather icon-lock" />
              </span>
              <span className="pcoded-mtext">Authentication</span>
            </a>
            <ul className="pcoded-submenu">
              <li className="">
                <a href="auth-signup.html" className="" target="_blank">
                  Sign up
                </a>
              </li>
              <li className="">
                <a href="auth-signin.html" className="" target="_blank">
                  Sign in
                </a>
              </li>
            </ul>
          </li> */}
          {/* <li data-username="Sample Page" className="nav-item">
            <a href="sample-page.html" className="nav-link">
              <span className="pcoded-micon">
                <i className="feather icon-sidebar" />
              </span>
              <span className="pcoded-mtext">Sample page</span>
            </a>
          </li>
          <li data-username="Disabled Menu" className="nav-item disabled">
            <a href="javascript:" className="nav-link">
              <span className="pcoded-micon">
                <i className="feather icon-power" />
              </span>
              <span className="pcoded-mtext">Disabled menu</span>
            </a>
          </li> */}
        </ul>
      </div>
    </div>
  </nav>
  {/* [ navigation menu ] end */}
  {/* [ Header ] start */}
  <header className="navbar pcoded-header navbar-expand-lg navbar-light">
    <div className="m-header">
      <a className="mobile-menu" id="mobile-collapse1" href="javascript:">
        <span />
      </a>
      <a href="index.html" className="b-brand">
        <div className="b-bg">
          <i className="feather icon-trending-up" />
        </div>
        <span className="b-title">Datta Able</span>
      </a>
    </div>
    <a className="mobile-menu" id="mobile-header" href="javascript:">
      <i className="feather icon-more-horizontal" />
    </a>
    <div className="collapse navbar-collapse">
   
      <ul className="navbar-nav ml-auto">
        <li>
          <div className="dropdown drp-user">
     
          <Link type="submit" onClick={handleLogout} className="fw-bold text-dark ms-3 text-decoration-none">
          <Button>Logout</Button>
                        </Link>
          </div>
        </li>
      </ul>
    </div>
  </header>
  {/* [ Header ] end */}
  {/* [ Main Content ] start */}
  <section className="pcoded-main-container">
    <div className="pcoded-wrapper">
      <div className="pcoded-content">
        <div className="pcoded-inner-content">
          {/* [ breadcrumb ] start */}
          <div className="page-header">
            <div className="page-block">
              <div className="row align-items-center">
                <div className="col-md-12">
                  <div className="page-header-title">
                    <h5 className="m-b-10">Tables</h5>
                  </div>
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="index.html">
                        <i className="feather icon-home" />
                      </a>
                    </li>
                    <li className="breadcrumb-item">
                      <a href="Admin">Tables</a>
                    </li>
                    <li className="breadcrumb-item">
                      <a href="javascript:">Hover Tables</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/* [ breadcrumb ] end */}
          <div className="main-body">
            <div className="page-wrapper">
              {/* [ Main Content ] start */}
              <div className="row">
              
                {/* [ Hover-table ] start */}
                <div className="col-xl-12">
                  <div className="card">
                    <div className="card-header">
                      <h5>Hover Table</h5>
                      <span className="d-block m-t-5">
                        use class <code>table-hover</code> inside table element
                      </span>
                    </div>
                    <div className="card-block table-border-style">
                      <div className="table-responsive">
                                <div>
                                  <input
                                    type="text"
                                    className='form-control'
                                    placeholder="Search by name"
                                    value={searchQuery}
                                    onChange={e => setSearchQuery(e.target.value)}
                                  />
                                  <button className='btn btn-primary mt-2 d-flex' onClick={handleSearch}>Search</button>
                                </div>
                        <table className="table table-hover">
                          <thead>
                            <tr>
                             
                              <th>Name</th>
                              <th>Contact</th>
                              <th>Date of birth</th>
                              <th>Total Users : {viewdata.length}</th>
                            </tr>
                          </thead>
                          <tbody>
                          {viewdata.map((item, index) => (
                            <tr>
                              <td>{item.name}</td>
                              <td>{item.contact}</td>
                              <td>{item.dob}</td>
                              <td><a className='btn btn-danger' onClick={()=>handleDelete(item._id)}><span className='text-white fw-bold'><i class="fa-solid fa-trash"></i></span></a></td>
                            </tr>
                           
                              ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                {/* [ Hover-table ] end */}
               
              </div>
              {/* [ Main Content ] end */}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* [ Main Content ] end */}
  {/* Warning Section Starts */}
  {/* Older IE warning message */}
  {/*[if lt IE 11]>
  <div class="ie-warning">
      <h1>Warning!!</h1>
      <p>You are using an outdated version of Internet Explorer, please upgrade
         <br/>to any of the following web browsers to access this website.
      </p>
      <div class="iew-container">
          <ul class="iew-download">
              <li>
                  <a href="http://www.google.com/chrome/">
                      <img src="assets/images/browser/chrome.png" alt="Chrome">
                      <div>Chrome</div>
                  </a>
              </li>
              <li>
                  <a href="https://www.mozilla.org/en-US/firefox/new/">
                      <img src="assets/images/browser/firefox.png" alt="Firefox">
                      <div>Firefox</div>
                  </a>
              </li>
              <li>
                  <a href="http://www.opera.com">
                      <img src="assets/images/browser/opera.png" alt="Opera">
                      <div>Opera</div>
                  </a>
              </li>
              <li>
                  <a href="https://www.apple.com/safari/">
                      <img src="assets/images/browser/safari.png" alt="Safari">
                      <div>Safari</div>
                  </a>
              </li>
              <li>
                  <a href="http://windows.microsoft.com/en-us/internet-explorer/download-ie">
                      <img src="assets/images/browser/ie.png" alt="">
                      <div>IE (11 & above)</div>
                  </a>
              </li>
          </ul>
      </div>
      <p>Sorry for the inconvenience!</p>
  </div>
    <![endif]*/}
  {/* Warning Section Ends */}
  {/* Required Js */}
</>

        </div>

//  <div>
// <h1>Form Datas</h1>
// <table className='table table-dark table-striped'>
//   <thead>
//     <tr>
//       <th>Name</th>
//       <th>age</th>
//       <th>Contact</th>
//       <th></th>
//       <th></th>
//     </tr>
//   </thead>
//   <tbody>
//     {viewdata.map((item, index) => (
//       <tr key={index}>
//         <td>{item.name}</td>
//         <td>{item.contact}</td>
//         <td>{item.dob}</td>
      
//       </tr>
//     ))}
    
//   </tbody>
// </table>
// </div> 

    )
}

export default Admintable