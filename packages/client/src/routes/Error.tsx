import { Link } from 'react-router-dom'

const Error = () =>
{
    return(
        <div>
            <h1>Error 404 - Page not found!</h1>
            <h2><Link to='/'>Voltar</Link></h2>
        </div>
    )
}

export default Error;