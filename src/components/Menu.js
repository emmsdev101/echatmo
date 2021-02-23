import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import './Pages/styles/menuStyle.css'
import Cookies from 'universal-cookie'
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';
import {updateUser, fetchRecipient} from '../queries/UserQuery'
import { FaEdit, FaSignOutAlt, FaUserCircle, FaWindowClose } from 'react-icons/fa';
const Menu = ({userInfo, action}) => {
    const cookie = new Cookies()
    const email =  cookie.get('username')
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [age, setAge] = useState(0);
    const [gender, setGender] = useState('');
    const [edit_info, setEdit_info] = useState(false);

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
    }, [userInfo]);
    const editSubmit = async() => {
        if(checkIfEmpty(firstname)&&checkIfEmpty(lastname)&&checkIfEmpty(age)&&checkIfEmpty(gender)){
            const userData ={
                email:email,
                firstname:firstname,
                lastname:lastname,
                age:age,
                gender:gender
            }
            console.log(userData)
            const updated = await updateUser(userData)
            if(updated.ok){
                alert('Sucess')
                const new_user_data = await fetchRecipient(email)
                setFirstname(new_user_data.firstname)
                setLastname(new_user_data.lastname)
                setAge(new_user_data.age)
                setGender(new_user_data.gender)
            }else{
                alert('Something went wrong')
            }
            setEdit_info(false)

        }else{
            alert('Please no blank field')
        }
        
    }
 
    const checkIfEmpty = ( str )=> {
        return /^[0-9a-zA-Z]+$/.test(str.toString().substr(0,2)) && str !== null && str !== undefined;
       }
    const personalInfo = ()=> {
        return (
            <>
             <div className ='edit-form'>
            <h6><b>Personal information</b></h6>
                <div className ='info-div'>
                    <label>Firstname:</label>
                    <input type = 'text' className = 'text-field'
                    value = {firstname} readOnly = 'true'/>
                </div>
                <div className ='info-div'>
                    <label>Lastname:</label>
                    <input type = 'text'className = 'text-field'
                    value = {lastname} readOnly = 'true'/>
                </div>
                <div className ='info-div'>
                    <label>Age:</label>
                    <input type = 'number' className ='text-field'
                    value = {age} readOnly = 'true'/>
                    </div>
                <div className ='info-div'>
                    <label>Gender:</label>
                    <input type = 'text' className ='text-field'
                    value={gender} readOnly='true'/>
                </div>
            </div>
            </>
        )
    }
    const editPersonalInfo =()=>{
        return(
            <>
            <div className ='edit-form'>
            <h6><b>Personal information</b></h6>
                <div className ='info-div'>
                    <label>Firstname:</label>
                    <input type = 'text' className = 'text-field'
                    value = {firstname} onChange={(e)=>{setFirstname(e.target.value)}}/>
                </div>
                <div className ='info-div'>
                    <label>Lastname:</label>
                    <input type = 'text'className = 'text-field'
                    value = {lastname} onChange={(e)=>{setLastname(e.target.value)}}/>
                </div>
                <div className ='info-div'>
                    <label>Age:</label>
                    <input type = 'number' className ='text-field'
                    value = {age} onChange={(e)=>{setAge(e.target.value)}}/>
                    </div>
                <div className ='info-div'>
                    <label>Gender:</label>
                    <select className ='text-field' onChange = {(e)=>{setGender(e.target.value)}}>
                        <option value = 'Male' selected = {gender === 'Male'}>Male</option>
                        <option value = 'Female' selected = {gender === 'Female'}>Female</option>
                    </select>
                </div>
            </div>
            </>
        )
    }

    const saveCancelBtn = ()=> {
        return(
            <div className ='btn-div'>
                <button value = 'Save' className = 'btn-save' onClick = {()=>{editSubmit()}}>Save</button>
                <button className = 'btn-cancel' onClick={()=>{setEdit_info(false)}}>Cancel</button>
          </div> 
        )
    }
    const editBtn = () => {
        return(
            <>
            <button className = 'profile-btn' onClick = {()=>{setEdit_info(true)}}>
                Edit Profile<FaEdit className = 'btn-icon'/></button>
                <button className = 'profile-btn'onClick = {()=>{logOut()}}>
               Logout<FaSignOutAlt className = 'btn-icon'/> </button>
   </>
    )
    }
    return (
        <div className = 'menu-wrapper'>
            <div className = 'menu-div'>
            <button className = 'back-btn' onClick = {()=>{closeMenu()}} > <FaWindowClose/></button>
                <div className = 'profile-div'>
                    <h3>Your Profile</h3>
                    <FaUserCircle className = 'user-profile'/>
                    <h4>{userInfo.firstname}</h4>
                    <hr></hr>
                    {edit_info?editPersonalInfo():personalInfo()}
                    <hr></hr>
                </div>
                
            {edit_info?saveCancelBtn():editBtn()}
            
        </div>
        </div>
        
    );
}

export default Menu;
