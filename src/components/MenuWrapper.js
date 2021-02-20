import React from 'react';
import { useEffect, useState } from "react";
import { FaEnvelope,FaEllipsisV,FaEdit, FaHeart, FaHome, FaPlusCircle, FaSearch, FaUser, FaUserCircle } from 'react-icons/fa';
import { FormControl, InputGroup, FormGroup,Button, Alert, Col, Container, Form, Row } from 'react-bootstrap';
import MessageBox from './Message'
import FriendItem from './FriendItem'
import CreateMessage from './CreateMessage'
import useChat from '../useChat'
import Cookies from 'universal-cookie';
import {fetchChatRoom, getRoom, setSeen} from '../queries/ChatRoomQuery'
import {fetchRecipient, searchUser} from '../queries/UserQuery'
import './Pages/styles/menuStyle.css'
const MenuWarpper = ({setFromSearch, displayType, setWindow, setOpenMenu,setOpenFriends, setRoom,newMessageRecieved}) => {
  const [menustate, setMenuState] = useState(false)
    const [chat_rooms, setChatRooms] = useState([])
    const [search_text, setSearch_text] = useState('');  
    const [peoples, setPeoples] = useState([]);
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
    useEffect(() => {
      const search = async()=>{
        const searched_user = await searchUser(search_text)
        if(search_text){
          setPeoples(searched_user)
        }
      }
      search()
    }, [search_text]);
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
    const displayMessages = ()=> {
      return (
        <>
        {chat_rooms.map((room, index)=>(
               <MessageBox id = {index} chat_room = {room} setAsCurrentRoom = {switchRoom} /> 
            ))}
        </>
      )
    }
    const displayPeople = ()=> {
      return (
        <>
        {peoples.map((friend, id)=>(
                   <FriendItem friend = {friend} key = {id} setRoom = {setFromSearch}/>
               ))}
        </>
      )
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
              <input className = 'search-input' type = 'text' 
              placeholder = 'Search' onChange={(e)=>{setSearch_text(e.target.value)}}/>
              <div className = 'search-btn'><FaSearch className='search'/></div>
            </div>
          </div>
          <div className = 'inbox-div'>
          <div className = 'ConversationBox'>
            {search_text.length>0?displayPeople():displayMessages()}
              </div>
            
          </div>
        </div>
    );
}

export default MenuWarpper;
