import './navbar.css';

import { useState } from "react";

import { NavbarDropDown, NavbarLink, NavbarLogo } from "./NavbarElements";

const Navbar = () =>
{
    const [checked , setChecked] = useState<boolean>(false)

    const LocationChangeHandle = () =>
    {
        setChecked(false);
    }

    const ClickHandle = () =>
    {
        setChecked(!checked);
    }

    return(
        <header id="navbar">

            {
                <input type="checkbox" id="hamburger-input" readOnly checked={checked}/> 
                /* hamburguer click target */
            }

            <div id="inside">                
                <NavbarLogo LocationChangeHandle={LocationChangeHandle}/>
                
                <label id="hamburger-menu" onClick={() => {ClickHandle()}} />

                <div id='links'>

                    <p className="menu-button" onClick={() => ClickHandle()}>Menu</p>

                    <NavbarLink LocationChangeHandle={LocationChangeHandle} link="/">Home</NavbarLink>

                    <NavbarDropDown checked={checked} clickHandle={ClickHandle} LocationChangeHandle={LocationChangeHandle} link="/employee">Employee</NavbarDropDown>
                    <NavbarDropDown checked={checked} clickHandle={ClickHandle} LocationChangeHandle={LocationChangeHandle} link="/employeetype">EmployeeType</NavbarDropDown>
                
                </div>
            </div>      

            <div className="overlay" onClick={() => {ClickHandle()}} />

        </header>
    )
}

export default Navbar;