import './home.css';

import Box from "../components/home/Box";

const Home = () =>
{    
    return(
        <div>
            <h1 className="home-hr">Home</h1>

            <div id="container">
                <Box table='/employee' >Employee</Box>
                <Box table="/employeetype">Employee Type</Box>
            </div>
        </div>
    )
}

export default Home;