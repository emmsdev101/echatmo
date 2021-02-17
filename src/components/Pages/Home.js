import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useRef, useEffect, useState } from 'react'
import Menu from '../Menu';
import MenuWrapper from '../MenuWrapper'
import Cookies from 'universal-cookie';
import ChatBoxWrapper from '../ChatBoxWrapper';
import Friends from '../Friends'

const CHAT_ROOM_API = 'http://localhost:5000/room/'


const Home = () => {
    const [menustate, setMenuState] = React.useState(false)
    const [current_room, setCurrentRoom] = React.useState({})
    const [chat_btn_back, setChatBack] = useState(false)
    const [current_window, setCurrentWindow] = useState(0)
    const cookies = new Cookies()
    const user_email = cookies.get('username')
    const [new_message_recieved, setNewMessage] = useState()
    const [menu_display, setMenuDisplay] = useState(true)
    const [chat_display, setChatDisplay] = useState(true)
    const [friends_display, setFriendsDisplay] = useState(false)
    const size = useWindowSize();

    const openFriends = (state) => {
      setCurrentWindow(1)
      if(isMobile()){
        setFriendsDisplay(true)
        setChatDisplay(false)
        setMenuDisplay(false)
      }else{
        displayMenu()
        setFriendsDisplay(true)
      }
    }

    const setRoom = (friend) => {
      if(isMobile()){
        displayChat()
      }else{
        setFriendsDisplay(false)
        setMenuDisplay(true)
        setChatDisplay(true)
      }
      
      const room = {
        chatroom_id: friend.email+user_email,
        creator: user_email,
        member: friend.email,
        type: 'non-group'
      }
      setCurrentRoom(room)
      setCurrentWindow(1)
    }
    
    const openMenu = (state) => {
      setMenuState(state)
    }
    const CloseFriendWindow = () => {
      if(isMobile()){
        setFriendsDisplay(false)
       displayMenu()
      }else{
        setFriendsDisplay(false)
        setMenuDisplay(true)
        setChatDisplay(true)
      }
      
  }
  const switchRoom = (obj) => {
    setCurrentRoom(obj)

  }
  const newMessageRecieved = (room_id) => {
    setNewMessage(room_id)

  }
  const isMobile = () =>{
    if(size.width < 600)return true
    else return false
  }
  const setCurrWindow = (val) => {
    if(isMobile()){
      setCurrentWindow(val)
      if(val === 1){
          displayChat()
          setChatBack(true)
      }else{
        displayMenu()
        setChatBack(false)
      }
    }else{
      setChatBack(false)
    }
  }

  useEffect(() => {
    if(!isMobile()){
      if(friends_display){
        setMenuDisplay(true)
        setChatDisplay(false)
      }else{
        setMenuDisplay(true)
        setChatDisplay(true)
      }
      setChatBack(false)
    }else{
      setChatBack(true)
      if(current_window === 1){
          displayChat()
      }else{
          displayMenu()
      }
    }
  }, [size]);
  
  const displayChat = ()=> {
    setFriendsDisplay(false)
    setMenuDisplay(false)
    setChatDisplay(true)
    if(isMobile){
      setChatBack(true)
    }
  }
  const displayMenu =() => {
    setMenuDisplay(true)
    setChatDisplay(false)
    setFriendsDisplay(false)
  }

    return (
        <>
        <div className = 'MainWrapper'>
        {menustate? <Menu action = {setMenuState}/>:''}
        <MenuWrapper setOpenMenu = {openMenu} displayType = {menu_display} setWindow = {setCurrWindow} setRoom ={switchRoom}setOpenFriends = {openFriends} newMessageRecieved={new_message_recieved}/> 
        <Friends setRoom={setRoom} displayType = {friends_display} CloseMe ={CloseFriendWindow}/>
       <ChatBoxWrapper chat_back_btn = {chat_btn_back} displayType = {chat_display} setWindow = {setCurrWindow} current_window = {current_window} current_room = {current_room} messageRecieved = {newMessageRecieved}/>
      </div>


    </>
    );
}
function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    
    // Add event listener
    window.addEventListener("resize", handleResize);
    
    // Call handler right away so state gets updated with initial window size
    handleResize();
    
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  return windowSize;
}

export default Home;
