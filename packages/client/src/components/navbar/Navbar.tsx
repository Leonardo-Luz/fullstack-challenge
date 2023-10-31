import { useState } from "react";
import {NavbarDropDown, NavbarLink, NavbarLogo} from "./NavbarElements";
import './navbar.css';

const Navbar = () =>
{
    const [checked , setChecked] = useState<boolean>(false)

    const LocationChangeHandle = () =>
    {
        setChecked(false);
    }

    const ClickHandle = (bool: boolean) =>
    {
        setChecked(bool);
    }

    return(
        <header id="navbar">
            {<input type="checkbox" id="hamburger-input" readOnly checked={checked}/>}
            <div id="inside">                
                <NavbarLogo LocationChangeHandle={LocationChangeHandle}/>
                
                <label id="hamburger-menu" onClick={() => {ClickHandle(true)}}>
                    <div id='links' onClick={()=> {ClickHandle(false)}}>
                        <p className="menu-button">Menu</p>
                        <NavbarLink LocationChangeHandle={LocationChangeHandle} link="/">Home</NavbarLink>
                        <NavbarDropDown LocationChangeHandle={LocationChangeHandle} link="/employee">Employee</NavbarDropDown>
                        <NavbarDropDown LocationChangeHandle={LocationChangeHandle} link="/employeetype">EmployeeType</NavbarDropDown>
                    </div>
                </label>
            </div>      

            <div className="overlay" onClick={() => {ClickHandle(false)}}></div>      
        </header>
    )
}

export default Navbar;