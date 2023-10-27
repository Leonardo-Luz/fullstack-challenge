import React from "react";
import { Link } from 'react-router-dom'
import './navbarElements.css';

type NavbarLinkProps = {
    children: React.ReactNode,
    link: string
};

const NavbarLink = ( { children , link }: NavbarLinkProps ) =>
{
    return(
        <div><Link to={link} >{children}</Link></div>
    )
}

export default NavbarLink;