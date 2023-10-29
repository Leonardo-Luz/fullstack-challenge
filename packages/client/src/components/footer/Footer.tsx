import { Link } from 'react-router-dom'
import './footer.css'

import logo from '../../images/logo512.png';
import twitter from '../../images/twitter.png'
import facebook from '../../images/facebook.png'
import instagram from '../../images/instagram.png'

const Footer = () =>
{
    return(
        <div id="footer">
            <Link to='/'><img className='logo' src={logo} alt="logo do site"/></Link>
    
            <div className="social-media">
                    <a href="https://www.instagram.com" target="new"><img src={instagram} alt="logo instagram"/></a>
                    <a href="https://www.facebook.com" target="new"><img src={facebook} alt="logo facebook"/></a>
                    <a href="https://www.twitter.com" target="new"><img src={twitter} alt="logo twitter"/></a>
            </div>
    
            <p className="copyright">CopyRight &copy; 2023 Leonardo Luz Fachel</p>
        </div>        
    )
}

export default Footer;