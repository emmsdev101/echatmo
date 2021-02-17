import React from 'react';
import { Button } from 'react-bootstrap';
import './Pages/styles/menuStyle.css'
import Cookies from 'universal-cookie'
const Menu = ({action}) => {
    const cookie = new Cookies()

    const logOut = () => {
        cookie.remove('username')
        action(false)
        window.location.reload()
    }
    const closeMenu = () => {
        action(false)
    }
    return (
        <div className = 'menu-wrapper'>
            <div className = 'menu-div'>
            <Button variant = 'secondary' onClick = {()=>{closeMenu()}} block>Back</Button>
            <Button variant = 'primary' onClick = {()=>{logOut()}} block>Logout</Button>
        </div>
        </div>
        
    );
}

export default Menu;
