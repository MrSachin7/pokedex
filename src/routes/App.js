import './App.css';
import {Link, NavLink, Outlet} from "react-router-dom"


function App() {
    return (<div className={"app"}>
        <div className={"nav-container"}>
            <NavLink to={"/app/home"} className={"nav-element"} activeClassName={"active-nav"}>
                Home
            </NavLink>

            <NavLink to={"/app/about-us"} className={"nav-element"} activeClassName={"active-nav"}>
                About Us
            </NavLink>

        </div>
        <Outlet/>
    </div>);
}

export default App;
