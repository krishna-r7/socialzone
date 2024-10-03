import react,{useState, useEffect} from 'react'

import { Route, Link } from 'react-router-dom';
import { Nav,Navbar,Button,Form, Container,Col,Row,Image } from 'react-bootstrap';


function Admin(){
  const [viewdata,setviewData] = useState([])

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
  
    return(
        <div>
            <>
  <title>Datta Able Free Bootstrap 4 Admin Template</title>
  {/* HTML5 Shim and Respond.js IE11 support of HTML5 elements and media queries */}
  {/* WARNING: Respond.js doesn't work if you view the page via file:// */}
  {/*[if lt IE 11]>
		
		
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
    content="Free Datta Able Admin Template come up with latest Bootstrap 4 framework with basic components, form elements and lots of pre-made layout options"
  />
  <meta
    name="keywords"
    content="admin templates, bootstrap admin templates, bootstrap 4, dashboard, dashboard templets, sass admin templets, html admin templates, responsive, bootstrap admin templates free download,premium bootstrap admin templates, datta able, datta able bootstrap admin template, free admin theme, free dashboard template"
  />
  <meta name="author" content="CodedThemes" />
  {/* Favicon icon */}
  <link rel="icon" href="../assets/images/favicon.ico" type="image/x-icon" />
  {/* fontawesome icon */}
  <link
    rel="stylesheet"
    href="./assets/fonts/fontawesome/css/fontawesome-all.min.css"
  />
  {/* animation css */}
  <link rel="stylesheet" href="../assets/plugins/animation/css/animate.min.css" />
  {/* vendor css */}
  <link rel="stylesheet" href="./assets/css/style.css" />
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
         
         
          <li
            data-username="basic components Button Alert Badges breadcrumb Paggination progress Tooltip popovers Carousel Cards Collapse Tabs pills Modal Grid System Typography Extra Shadows Embeds"
            className="nav-item pcoded-hasmenu"
          >
           
            <ul className="pcoded-submenu">
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
            </ul>
          </li>
          <li className="nav-item pcoded-menu-caption">
          
            <label>Forms &amp; table</label>
           
          </li>
          
          <li
            data-username="Table bootstrap datatable footable"
            className="nav-item"
          >
            
            <a href="tbl_bootstrap.html" className="nav-link ">
              <span className="pcoded-micon">
                <i className="feather icon-server" />
              </span>
              <Link to="/Admintable">
              <span className="pcoded-mtext">Table</span>
               </Link>
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
          </li> */}
          {/* <li className="nav-item pcoded-menu-caption">
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
        <span className="b-title">Admin</span>
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
  <div className="pcoded-main-container">
    <div className="pcoded-wrapper">
      <div className="pcoded-content">
        <div className="pcoded-inner-content">
          {/* [ breadcrumb ] start */}
          {/* [ breadcrumb ] end */}
          <div className="main-body">
            <div className="page-wrapper">
              {/* [ Main Content ] start */}
              <div className="row">
                {/*[ daily sales section ] start*/}
                <div className="col-md-6 col-xl-4">
                  <div className="card daily-sales">
                    <div className="card-block">
                      <h6 className="mb-4">No of Users</h6>
                      <div className="row d-flex align-items-center">
                        <div className="col-9">
                          <h3 className="f-w-300 d-flex align-items-center m-b-0">
                            <i className="feather icon-arrow-up text-c-green f-30 m-r-10 " />
                         {viewdata.length}
                          </h3>
                        </div>
                      
                      </div>
                      <div className="progress m-t-30" style={{ height: 7 }}>
                        <div
                          className="progress-bar progress-c-theme"
                          role="progressbar"
                          style={{ width: "50%" }}
                          aria-valuenow={50}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/*[ daily sales section ] end*/}
                {/*[ Monthly  sales section ] starts*/}
                {/* <div className="col-md-6 col-xl-4">
                  <div className="card Monthly-sales">
                    <div className="card-block">
                      <h6 className="mb-4">Monthly Sales</h6>
                      <div className="row d-flex align-items-center">
                        <div className="col-9">
                          <h3 className="f-w-300 d-flex align-items-center  m-b-0">
                            <i className="feather icon-arrow-down text-c-red f-30 m-r-10" />
                            $ 2.942.32
                          </h3>
                        </div>
                        <div className="col-3 text-right">
                          <p className="m-b-0">36%</p>
                        </div>
                      </div>
                      <div className="progress m-t-30" style={{ height: 7 }}>
                        <div
                          className="progress-bar progress-c-theme2"
                          role="progressbar"
                          style={{ width: "35%" }}
                          aria-valuenow={35}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        />
                      </div>
                    </div>
                  </div>
                </div> */}
                {/*[ Monthly  sales section ] end*/}
                {/*[ year  sales section ] starts*/}
                {/* <div className="col-md-12 col-xl-4">
                  <div className="card yearly-sales">
                    <div className="card-block">
                      <h6 className="mb-4">Yearly Sales</h6>
                      <div className="row d-flex align-items-center">
                        <div className="col-9">
                          <h3 className="f-w-300 d-flex align-items-center  m-b-0">
                            <i className="feather icon-arrow-up text-c-green f-30 m-r-10" />
                            $ 8.638.32
                          </h3>
                        </div>
                        <div className="col-3 text-right">
                          <p className="m-b-0">80%</p>
                        </div>
                      </div>
                      <div className="progress m-t-30" style={{ height: 7 }}>
                        <div
                          className="progress-bar progress-c-theme"
                          role="progressbar"
                          style={{ width: "70%" }}
                          aria-valuenow={70}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        />
                      </div>
                    </div>
                  </div>
                </div> */}
 
              </div>
             
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
</>

        </div>
    )
}

export default Admin