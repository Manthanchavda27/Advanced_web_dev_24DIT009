function Header({name , themeColor}){

    return (
        <header
          style={{
            backgroundColor: themeColor,
            color: "white",
            padding: "20px",
            textAlign: "center",
          }}
        >
            <h1>{name}'s portfolio</h1>
        </header>
    );

}

export default Header;