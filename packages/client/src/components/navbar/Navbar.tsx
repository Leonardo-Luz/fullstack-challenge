import NavbarLink from "./NavbarElements";
import './navbar.css';

const Navbar = () =>
{
    return(
        <header id="navbar">
            <div id="inside">
                <NavbarLink link="/">Home</NavbarLink>
                <NavbarLink link="/employee">Employee</NavbarLink>
                <NavbarLink link="/employeetype">EmployeeType</NavbarLink>
            </div>            
        </header>
    )
}

export default Navbar;