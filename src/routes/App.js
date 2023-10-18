import './App.css';
import {NavLink, Outlet} from "react-router-dom"


function App() {
    return (<div className={"app"}>
        <div className={"nav-container"}>
            <NavLink to={"/app/home"} className={"nav-element"}>
                Home
            </NavLink>

            <NavLink to={"/app/about-us"} className={"nav-element"}>
                About Us
            </NavLink>

        </div>
        <Outlet/>
    </div>);
}

export default App;
