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
                    <li style={{color: "yellow",fontWeight: "bold"}}>Home</li>
                    <li style={{color: "white"}}>About</li>
                    <li style={{color: "white"}}>Skills</li>
                    <li style={{color: "white"}}>Contact</li>
            </ul>
            </nav>
        </div>
    );

}

export default NavBar;