import { Link, Outlet } from "react-router-dom";
import "./Navbar.css";
import logo from "../../Assets/Logo.png"

const Navbar = () => {
  return (
    <>
      <div className="nav__container">
        <div className="nav__left">
          <Link className="nav__left--logo" to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Navbar;
