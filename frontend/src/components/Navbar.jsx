import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import "./Navbar.css";

const Navbar = ({ toggleDiv }) => (
    <nav className="navbar">
        <div className="lefto">
            <div className="circle"></div>
            <div className="name"> <Link to="/"  className="blacki">Harish Puhaniya</Link></div>
        </div>
        <div className="righto">
            <Link to="/#education" className="nav-link">Education</Link>
            <Link to="/#portfolio" className="nav-link">Projects</Link>
            <Link to="/#photography" className="nav-link">photography</Link>
            <Link to="/#blogs" className="nav-link">Blogs</Link>
            <Link to="/#contact" className="nav-link">Contact</Link>
        </div>
        <div className="righto2" >

            <img src={logo} alt="ScamShield" className="logo" onClick={toggleDiv} />

        </div>
    </nav>
);

export default Navbar;