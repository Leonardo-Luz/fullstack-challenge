import './navbarElements.css';

import React, { useState } from "react";
import { Link } from 'react-router-dom'

import logo from '../../images/logo512.png'

type NavbarLinkProps = {
    children: React.ReactNode,
    link: string,
    LocationChangeHandle: () => void
};

type NavbarLogoProps = {
    LocationChangeHandle: () => void
};

type NavbarDropDownProps = {
    checked: boolean,
    children: React.ReactNode,
    link: string,
    clickHandle: () => void,
    LocationChangeHandle: () => void
}

export const NavbarLink = ( { children , link , LocationChangeHandle }: NavbarLinkProps ) =>
{
    return <Link onClick={() => LocationChangeHandle()} className="navbar-link" to={link}>{children}</Link>
}

export const NavbarLogo = ( { LocationChangeHandle } : NavbarLogoProps ) =>
{
    return  <Link onClick={() => LocationChangeHandle()} to='/'>
                <img className='navbar-logo' src={logo} alt="logo do site"/>
            </Link>
}

export const NavbarDropDown = ( { children , link , LocationChangeHandle }: NavbarDropDownProps ) =>
{
    const [checked_ , setChecked_] = useState<boolean>(false)

    //drop down menu click handle
    const clickHandle_ = () => setChecked_(!checked_);
    
    //drop down menu route change handle
    const LocationChangeHandle_ = () => setChecked_(false);
    
    return (
        <div>
            {
                <input type="checkbox" id={'navbar-div-input-'+ children} readOnly checked={checked_}/>
                /* dropdown click target */
            }
            <label className="navbar-div">
                <div className="drop-down" onClick={() => {clickHandle_()}}>{children}</div>

                {
                    checked_ && 
                    <div className="drop-down-menu">
                            <Link onClick={() => {LocationChangeHandle(); LocationChangeHandle_();}} to={link+'form'} className="navbar-link">Create</Link>
                            <Link onClick={() => {LocationChangeHandle(); LocationChangeHandle_();}} to={link} className="navbar-link">List</Link>
                    </div>
                }
            </label>
        </div>
    )
}