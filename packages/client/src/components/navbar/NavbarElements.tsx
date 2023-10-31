import React, { useState } from "react";
import { Link } from 'react-router-dom'
import logo from '../../images/logo512.png'
import './navbarElements.css';

type NavbarLinkProps = {
    LocationChangeHandle: () => void,
    children: React.ReactNode,
    link: string
};

type NavbarLogoProps = {
    LocationChangeHandle: () => void,
};

export const NavbarLink = ( { children , link , LocationChangeHandle }: NavbarLinkProps ) =>
{
    return <Link onClick={() => LocationChangeHandle()} className="navbar-link" to={link}>{children}</Link>
}

export const NavbarDropDown = ( { children , link , LocationChangeHandle }: NavbarLinkProps ) =>
{
    const [checked_ , setChecked_] = useState<boolean>(false)

    const clickHandle_ = () =>
    {
        setChecked_(!checked_);
    }

    const LocationChangeHandle_ = () =>
    {
        setChecked_(false);
    }


    return <label className="navbar-div">
                {<input type="checkbox" id={'navbar-div-input-'+children} readOnly checked={checked_}/>}
                <div className="drop-down" onClick={() => {clickHandle_()}}>{children}</div>
                <div className="drop-down-menu">
                    <Link onClick={() => {LocationChangeHandle(); LocationChangeHandle_()}} to={link+'form'} className="navbar-link">Create</Link>
                    <Link onClick={() => {LocationChangeHandle(); LocationChangeHandle_()}} to={link} className="navbar-link">List</Link>
                </div>
            </label>
}

export const NavbarLogo = ( {LocationChangeHandle} : NavbarLogoProps ) =>
{
    return <Link onClick={() => LocationChangeHandle()} to='/'><img className='navbar-logo' src={logo} alt="logo do site"/></Link>
}