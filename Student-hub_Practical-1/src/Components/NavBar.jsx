import { Link } from "react-router-dom";

function NavBar(){

    return(
        <div>
            <nav>
            <ul
                style = {{
                    display : "flex",
                    justifyContent : "Center",
                    lifeStyle : "none",
                    gap : "20px",
                    padding :  "15px",
                    backgroungColor : "#333",
                }}
                >
             <li>
          <Link to="/" style={{ color: "white", textDecoration: "none" }}>
            Home
          </Link>
        </li>

        <li>
          <Link to="/projects" style={{ color: "white", textDecoration: "none" }}>
            Projects
          </Link>
        </li>

        <li>
          <Link to="/contact" style={{ color: "white", textDecoration: "none" }}>
            Contact
          </Link>
        </li>
            </ul>
            </nav>
        </div>
    );

}

export default NavBar;