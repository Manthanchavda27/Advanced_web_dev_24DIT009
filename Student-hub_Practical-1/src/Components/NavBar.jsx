import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <div>
      <nav>
        <ul
          style={{
            display: "flex",
            justifyContent: "center",
            listStyle: "none",
            gap: "20px",
            padding: "15px",
            backgroundColor: "#333",
          }}
        >
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) => (isActive ? "nav-button active" : "nav-button")}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/projects"
              className={({ isActive }) => (isActive ? "nav-button active" : "nav-button")}
            >
              Projects
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) => (isActive ? "nav-button active" : "nav-button")}
            >
              Contact
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;