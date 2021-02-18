import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import './Pages/styles/menuStyle.css'
import Cookies from 'universal-cookie'
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';
import {fetchRecipient} from '../queries/UserQuery'
import { FaEdit, FaSignOutAlt, FaUserCircle, FaWindowClose } from 'react-icons/fa';
const Menu = ({userInfo, action}) => {
    const cookie = new Cookies()
    const [user, setUser] = useState({})
    const email =  cookie.get('username')
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [age, setAge] = useState();
    const [gender, setGender] = useState('');

    const logOut = () => {
        cookie.remove('username')
        action(false)
        window.location.replace('/log-in')
    }
    const closeMenu = () => {
        action(false)
    }
    useEffect(() => {
        setFirstname(userInfo.firstname)
        setLastname(userInfo.lastname)
        setAge(userInfo.age)
        setGender(userInfo.gender)
    }, []);
    return (
        <div className = 'menu-wrapper'>
            <div className = 'menu-div'>
               
            <button className = 'back-btn' onClick = {()=>{closeMenu()}} > <FaWindowClose/></button>
                <div className = 'profile-div'>
                    <h3>Your Profile</h3>
                    <FaUserCircle className = 'user-profile'/>
                    <h3>{userInfo.firstname}</h3>
                    <hr></hr>
                    <div className = 'user-info-div'>
                        <p>Firstname:</p>
                        <input type = 'text' className = 'profile-text'
                        value = {firstname}/>
                        </div>
                    <div className = 'user-info-div'>
                        <p>Lastname: </p>
                        <input type = 'text' className = 'profile-text'
                        value = {lastname}/>
                        </div>
                    <div className = 'user-info-div'>
                        <p>Age: </p>
                        <input type = 'text' className = 'age-text'
                        value ={age}/>
                        <p>Gender: </p>
                        <input type = 'text' className = 'gender-text'
                        value = {gender}/>
                    </div>
                    <hr></hr>
                    

                </div>
                <button className = 'profile-btn'>
                    <FaEdit className = 'btn-icon'/>Edit Profile</button>

            <button className = 'profile-btn'onClick = {()=>{logOut()}}>
               <FaSignOutAlt className = 'btn-icon'/> Logout</button>
        </div>
        </div>
        
    );
}

export default Menu;
