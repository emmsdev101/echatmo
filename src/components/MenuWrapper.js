import React from 'react';
import { useEffect, useState } from "react";
import { FaEnvelope,FaEllipsisV,FaEdit, FaHeart, FaHome, FaPlusCircle, FaSearch, FaUser, FaUserCircle } from 'react-icons/fa';
import { FormControl, InputGroup, FormGroup,Button, Alert, Col, Container, Form, Row } from 'react-bootstrap';
import MessageBox from './Message'
import CreateMessage from './CreateMessage'
import useChat from '../useChat'
import Cookies from 'universal-cookie';
import {fetchChatRoom, getRoom, setSeen} from '../queries/ChatRoomQuery'
import {fetchRecipient} from '../queries/UserQuery'
import './Pages/styles/menuStyle.css'
const MenuWarpper = ({displayType, setWindow, setOpenMenu,setOpenFriends, setRoom,newMessageRecieved}) => {
  const [menustate, setMenuState] = useState(false)
    const [chat_rooms, setChatRooms] = useState([])
    const cookies = new Cookies()
    const user_email = cookies.get('username')
    
    useEffect(() => {
      const getChatRoom = async () => {
        const data = await fetchChatRoom(user_email)
        setChatRooms(data)
        if(data !== null){
            setRoom(data[0])
        }
      }
      getChatRoom()
    }, []);
    useEffect(() => {
      const getChatRoom = async () => {
        const newdata = await fetchChatRoom(user_email)
        setChatRooms([])
        setChatRooms(newdata)
        if(newdata.length === 1){
          switchRoom(newdata[0])
        }
      }
      if(typeof(newMessageRecieved)!== 'undefined' && newMessageRecieved !== ''){  
        getChatRoom()
      }
    }, [newMessageRecieved]);

    const switchRoom = (room) => {
      setRoom(room)
      setWindow(1)
  
    }
    const openMenu = () => {
      setOpenMenu(true)
    }
    const openFriends =()=>{
      setOpenFriends(true)
    }
  
    return (
        <div className = {displayType?'MenuWrapper':'hide'} >
          <div className = 'MenuHeader'>
            <FaUserCircle className = 'user-icon' onClick = {()=>{openMenu()}}></FaUserCircle>
              <h3 className = 'appname'>Chats</h3>
              <button className = 'create-message' >
            <FaEdit className='plus' onClick = {()=>{openFriends()}}></FaEdit>
            </button>
          </div>
          <hr></hr>
          <div className = 'search-div'>
            <div className ='search-box'>
              <input className = 'search-input' type = 'text'/>
              <div className = 'search-btn'><FaSearch className='search'/></div>
            </div>
          </div>
          <div className = 'inbox-div'>
          <div className = 'ConversationBox'>
          {chat_rooms.map((room, index)=>(
               <MessageBox id = {index} chat_room = {room} setAsCurrentRoom = {switchRoom} /> 
            ))}
              </div>
            
          </div>
        </div>
    );
}

export default MenuWarpper;
