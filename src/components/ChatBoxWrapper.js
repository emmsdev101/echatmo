import { FaEllipsisV,FaEdit, FaHeart, FaHome, FaPlusCircle, FaSearch, FaUser, FaUserCircle, FaArrowLeft } from 'react-icons/fa';
import { Button, Alert, Col, Container, Form, Row } from 'react-bootstrap';
import MessageItem from './MessageItem'
import MyMessageItem from  './MyMessage'
import {checkRoom, createRoom, seenCreator, seenMember} from '../queries/ChatRoomQuery'
import {fetchRecipient} from '../queries/UserQuery'
import Friends from './Friends'
import useChat from '../useChat'
import React, { useRef, useEffect, useState } from 'react'
import Cookies from 'universal-cookie'
import ConvoLoading from './loading/ConvoLoading/ConvoLoading'
import ChatboxMenu from './Pages/dropmenu/ChatboxMenu'
const ChatBoxWrapper = ({displayType, current_room, messageRecieved, setWindow, chat_back_btn}) => {
   
    const [newMessage, setNewMessage] = React.useState("");
    const scrollBottom = useRef(null)
    const cookies = new Cookies()
    const user_email = cookies.get('username')
    const [isloading, setLoading] = React.useState(true)
    const [recipient, setRecipient] = React.useState({})
    const {messages, sendMessage, sendRoom, newMessageRecieved, loading } = useChat()
    const [current_room_id, setCurrentRoomId] = React.useState('')
    const [chat_menu, setChat_menu] = useState(false);

    useEffect(() => {
        scrollToBottom()
        setLoading(false) 
    }, [messages]);
    useEffect(() => {
        if(current_room !== undefined){
          setLoading(true)
            getRecipient(current_room)
            sendRoom(current_room)
        }
    }, [current_room]);

    useEffect(() => {
        messageRecieved(newMessageRecieved)
    }, [newMessageRecieved]);
    useEffect(() => {
      
  }, [loading]);

    const getRecipient = async(room)=> {
        let remail 
        if(room.creator === user_email){
          remail = room.member
        }else{
          remail =room.creator
        }
        const rinfo = await fetchRecipient(remail)
        setRecipient(rinfo)
      }

    const submitMsg = async (e)=> {  
        e.preventDefault()
        const roomExists = await checkRoom(current_room.chatroom_id)
        if(roomExists){
          const to_send = {
            body:newMessage,
            reciever: recipient.email}
            if(current_room.creator === user_email){
              seenCreator(current_room.chatroom_id, 0)
            }else{
              seenMember(current_room.chatroom_id, 0)
              
            }
          sendMessage(to_send)
         
        }else{
          if(await createRoom(current_room)){
            const to_send = {
              body:newMessage,
              reciever: recipient.email
          }
          sendMessage(to_send)
          }
         
        }
        setNewMessage('')
      }
      
      
    const scrollToBottom = () => {
        scrollBottom.current?.scrollIntoView({
              behavior: 'smooth'
          })
      }
     
      const onTextChange = (e) => {
        setNewMessage(e.target.value)
    }
    const convos = () =>{
      return(
        <>
        {messages.slice(0).reverse().map((msg, id)=> (
          msg.sender === user_email? 
          <MyMessageItem key={id} msg = {msg.message}/>:
          <MessageItem key={id} msg = {msg.message}/>  
      ))}
      </>
      )
      
    }

    return ( 
        <div className = {displayType?'ChatBoxWrapper':'hide' } >
          <div className = 'ChatBoxHeader' onClick ={()=>{if(chat_menu)setChat_menu(false);}}>
          {chat_back_btn ? <div className = 'chat-box-nav'>
          <Button className='btn-back' variant = 'outline' size='sm' onClick = {()=>{setWindow(0)}}><FaArrowLeft className = 'back-icon'/></Button>
          </div>:''}
             <div className = 'conversation-name'><h5 >{recipient.email !== undefined? recipient.firstname+' '+recipient.lastname:''}</h5></div>
            <div className = 'conv-menu-div' onClick ={()=>{setChat_menu(true)}}><FaEllipsisV className = 'convo-menu'/>
            </div>
          </div>
          {chat_menu?<ChatboxMenu chat_room = {current_room_id}/>:''}
          <div className='convo-box' onClick ={()=>{if(chat_menu)setChat_menu(false);}}>
          <div  ref = {scrollBottom}/>
            {isloading?<ConvoLoading/>:convos()}
          </div>
          <div className = 'input-box'>
              <Form className = 'text-input' onSubmit = {(e)=>{submitMsg(e)}}>
              <input type = 'text' className = 'input-text'
                      onChange = {onTextChange}
                      value = {newMessage}/>
              </Form>
              <button className = 'send-button'
                onClick = {submitMsg} >Send</button>
          </div>
        </div>
    );
}

export default ChatBoxWrapper;
