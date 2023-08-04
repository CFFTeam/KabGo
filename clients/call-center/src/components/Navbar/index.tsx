import React from 'react';
import styles from "./navbar.module.css";

const Navbar: React.FC = () => {
    return (
        <nav className = {styles["nav-bar"]}>
            <h1 style  = {{textAlign: "center"}}>
                THIS IS NAVBAR
            </h1>
        </nav>
    );
}

export default Navbar;