import React from 'react';
import { useEffect, useState } from "react";
import { FaEnvelope,FaEllipsisV,FaEdit, FaSearch, FaUserCircle } from 'react-icons/fa';
import MessageBox from './Message'
import FriendItem from './FriendItem'
import Cookies from 'universal-cookie';
import {fetchChatRoom,fetchOneRoom} from '../queries/ChatRoomQuery'
import {searchUser} from '../queries/UserQuery'
import './Pages/styles/menuStyle.css'
const MenuWarpper = ({setFromSearch, displayType, setWindow, setOpenMenu,setOpenFriends, setRoom,newMessageRecieved}) => {
    const [chat_rooms, setChatRooms] = useState([])
    const [search_text, setSearch_text] = useState('');  
    const [peoples, setPeoples] = useState([]);
    const cookies = new Cookies()
    const user_email = cookies.get('username')
    const [notification, setNofication] = useState('');
    const [current_room, setCurrent_room] = useState('');

    useEffect(() => {
      const getChatRoom = async () => {
        const data = await fetchChatRoom(user_email)
        setChatRooms(data)

        if(data !== null){
            setRoom(data[0])
            setCurrent_room(data[0].chatroom_id)
        }
      }
      getChatRoom()
    }, []);

    useEffect(() => { 
      if(typeof(newMessageRecieved)!== 'undefined' && newMessageRecieved !== ''){
        const new_room = newMessageRecieved.roomId
        if(!roomExists(new_room)){
          roomInfo(new_room)
          setNofication(newMessageRecieved.date)
        }else{
          let room_index = searchRoomIndex(new_room)
          let toreplace = chat_rooms[room_index]
          let top = chat_rooms.slice(0, room_index)
          let botoom = chat_rooms.slice(room_index+1, chat_rooms.length)
          top.unshift(toreplace)
          let newrooms = top.concat(botoom)
          setChatRooms(newrooms)
          setNofication(newMessageRecieved.date)
        }
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

    const searchRoomIndex = (new_room) => {
      let i = 0
      for(i in chat_rooms){
        if(new_room === chat_rooms[i].chatroom_id){
          return parseInt(i)
        }
      }
    }
    const roomExists = (room_recieved)=>{
      let i
      for(i in chat_rooms){
        if(chat_rooms[i].chatroom_id === room_recieved){
          return true
        }
      }
      return false
    }
  
    const roomInfo = async(room_recieved) =>{
      const room = await fetchOneRoom(room_recieved)
      setChatRooms((chat_rooms)=>[room, ...chat_rooms])
    }
    const switchRoom = (room) => {
      setRoom(room)
      setCurrent_room(room.chatroom_id)
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
        {chat_rooms.map((item, index)=>(
               <MessageBox id = {index} room = {item} notification = {notification}
               setAsCurrentRoom = {switchRoom}
               selectedRoom = {current_room}/> 
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
