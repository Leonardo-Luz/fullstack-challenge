import './footer.css'

import { Link } from 'react-router-dom'

import logo from '../../images/logo512.png';
import twitter from '../../images/twitter.png'
import facebook from '../../images/facebook.png'
import instagram from '../../images/instagram.png'

type FooterMediaLinkProps = {
    to: string,
    image: string,
    alt: string
};

const FooterMediaLink = ( { to , image , alt }: FooterMediaLinkProps ) => 
{
    return(
        <a href={to} target='new'><img src={image} alt={alt} /></a>
    )
}

const Footer = () =>
{
    return(
        <div id="footer">
            <Link to='/'><img className='logo' src={logo} alt="logo do site"/></Link>
    
            <div className="social-media">
                    <FooterMediaLink to='https://www.instagram.com' image={instagram} alt='logo instagram' />
                    <FooterMediaLink to='https://www.facebook.com' image={facebook} alt='logo facebook' />
                    <FooterMediaLink to='https://www.twitter.com' image={twitter} alt='logo twitter' />
            </div>
    
            <p className="copyright">CopyRight &copy; 2023 Leonardo Luz Fachel</p>
        </div>        
    )
}

export default Footer;