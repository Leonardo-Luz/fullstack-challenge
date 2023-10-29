import {NavbarLink, NavbarLogo} from "./NavbarElements";
import './navbar.css';

const Navbar = () =>
{
    return(
        <header id="navbar">
            <div id="inside">                
                <NavbarLogo/>
                <div id='links'>
                    <NavbarLink link="/">Home</NavbarLink>
                    <NavbarLink link="/employee">Employee</NavbarLink>
                    <NavbarLink link="/employeetype">EmployeeType</NavbarLink>
                </div>
            </div>            
        </header>
    )
}

export default Navbar;