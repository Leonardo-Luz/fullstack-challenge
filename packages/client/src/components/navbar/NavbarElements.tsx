import React from "react";
import { Link } from 'react-router-dom'
import logo from '../../images/logo512.png'
import './navbarElements.css';

type NavbarLinkProps = {
    children: React.ReactNode,
    link: string
};

export const NavbarLink = ( { children , link }: NavbarLinkProps ) =>
{
    return <Link className="navbar-link" to={link}>{children}</Link>
}

export const NavbarLogo = () =>
{
    return <Link to='/'><img className='navbar-logo' src={logo} alt="logo do site"/></Link>
}