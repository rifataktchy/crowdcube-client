import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import "./Navbar.css";
// import { useContext } from "react";
// import { AuthContext } from "../provider/AuthProvider";
const Navbar = () => {
  // const {user,logOut} = useContext(AuthContext);
    return (
        <div>
           <div className="navbar bg-[rgba(164,132,63,0.837)] m-6 rounded-full w-12/12 mx-auto text-white">
  <div className="navbar-start ">
    <div className="dropdown ">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu  font-bold bg-[rgba(164,132,63,0.837)] menu-sm dropdown-content rounded-box z-50 mt-3 w-52 p-2 shadow">
        <li><NavLink to='/'>Home</NavLink></li>
      <li><NavLink to='/campaigns'>Donation Campaigns</NavLink></li>
      <li><NavLink to='/howtohelp'>How to Help</NavLink></li>
      <li><NavLink to='/dashboard'>Dashboard</NavLink></li>
      </ul>
    </div>
    <Link className="" to='/'><img className="h-14 w-14 rounded-full" src={logo} alt=""/></Link>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1 font-bold text-xl">
      <li><NavLink to='/'>Home</NavLink></li>
      <li><NavLink to='/campaigns'>all Campaigns</NavLink></li>
      <li><NavLink to='/howtohelp'>Add New Campaign</NavLink></li>
      <li><NavLink to='/howtohelp'>My Campaign</NavLink></li>
      <li><NavLink to='/howtohelp'>My Donation</NavLink></li>
     
    </ul>
  </div>
  <div className="navbar-end gap-4">
    {/* <div>
      {
      user && user?.email ? (<div><img className="w-10 h-10 rounded-full mr-4" src={user?.photoURL} alt="" /></div>): (
        <NavLink className="p-2 rounded-lg font-bold text-xl" to='/auth/register'>Signup</NavLink>)  
      }
    </div>
    {
      user && user?.email ? (
        <button className="font-bold text-xl pr-2" onClick={logOut}>Signout</button>
      ) : (
      <NavLink className="p-2 rounded-lg font-bold text-xl" to='/auth/login'>Login</NavLink>)
    } */}

<NavLink className="p-2 rounded-lg font-bold text-xl" to='/auth/register'>Signup</NavLink>
<NavLink className="p-2 rounded-lg font-bold text-xl" to='/auth/login'>Login</NavLink>
  </div>

</div>
        </div>
    );
};

export default Navbar;