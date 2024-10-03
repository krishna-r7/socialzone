import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import Login from './components/Login';
import Signup from './components/Signup';
import Admin from './components/Admin/Admin';
import Admintable from './components/Admin/Admintable';
import Fetchdata from './components/Fetchdata';
import Update from './components/Update';
import { ToastContainer, toast } from 'react-toastify';
import Viewother from './components/Viewother';

import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <div className="App">
        {/* <Dashboard /> */}
        {/* <Login /> */}
    {/* <Signup /> */}
    {/* <Admin/> */}
  

    <Router>
        <ToastContainer
          position="top-right"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
{/* Same as */}
<ToastContainer />
      <Routes>
        <Route exact path="/Dashboard" element={<Dashboard />} />
        <Route exact path="/Profile" element={<Profile />} />
        <Route path="/" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Admin" element={<Admin />} />
        <Route path="/Admintable" element={<Admintable />} />
        <Route path="/Fetchdata" element={<Fetchdata />} />
        <Route path="/Update/:id" element={<Update />} />
        <Route path="/Viewother/:loginedid" element={<Viewother />} />

      </Routes>
    </Router>
   
    </div>
  );
}

export default App;
