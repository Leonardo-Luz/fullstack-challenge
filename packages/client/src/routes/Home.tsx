import Box from "../components/home/Box";
import './home.css'

const Home = () =>
{
    return(
        <div>
            <h1>Home</h1>

            <hr className="home-hr"/>

            <div id="container">
                <Box target1='/employeeform' target2="/employee">Employee</Box>
                <Box target1='/employeetypeform' target2="/employeetype">Employee Type</Box>
            </div>
        </div>
    )
}

export default Home;