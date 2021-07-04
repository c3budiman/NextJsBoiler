// import styles from './NavbarPrimary.module.css'
import React, { useState, useEffect } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    // NavbarText
} from 'reactstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faSearch } from '@fortawesome/free-solid-svg-icons'

const NavbarPrimary = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [yScrollPosition, setYScrollPosition] = useState(0);

    const toggle = () => setIsOpen(!isOpen);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setYScrollPosition(currentScrollY)
        };
        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
    }, []);

    return (
        <div>
            <Navbar id="navbarCflix" className={yScrollPosition < 10 && !props.noTransparent ? "bg-transparent" : "bg-black"} fixed="top" dark expand="md">
                <NavbarBrand style={{ marginLeft: 40 }} href="/">NextJS Boiler</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse style={{ margin: "0px 40px" }} className="menu-navigation" isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <NavLink className={props.activeMenu === "home" ? "active" : ""} href="/">Home</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className={props.activeMenu === "examples" ? "active" : ""} href="/examples">Examples</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
}

export default NavbarPrimary;