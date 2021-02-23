import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { seenCreator, seenMember, updateChatroom } from "./queries/ChatRoomQuery";

import Cookies from 'universal-cookie' 
const socketPort = 'https://serene-hamlet-21553.herokuapp.com/'
const CHAT_STORAGE_API = 'https://serene-hamlet-21553.herokuapp.com/chat/'


const useChat = () => {
    const cookies = new Cookies()
    const user_email = cookies.get('username')
    const [roomId, setRoomId] = useState('')
    const socket = useRef(roomId)
    const [messages, setMessages] = useState([])
    const [newMessageRecieved, setNewMessage] = useState('')
    const [loading, setLoading] = useState(true)
    const [room, setroom] = useState({});
    
    useEffect(()=>{
    
        socket.current = io(socketPort, {
            query: {roomId: roomId, username: user_email},
            
        })
        socket.current.on('chat message', (message)=>{
                    
            const recieviedMessage = {...message, sender:message.senderId}
            setMessages((messages) => [...messages, recieviedMessage])
        })
        socket.current.on('new_message', (notification)=> {
           // console.log(notification)
            setNewMessage(notification)
        })
        return () => {
            socket.current.disconnect()
        }
    },[roomId])
    
    const sendMessage = async (message) => {
        const to_save = {
            sender: user_email,
            body: message.body
        }
        const isSaved = await saveMessage(to_save)
        if(isSaved){
            socket.current.emit('chat message', {
                message: message.body,
                senderId: user_email,
                recieverId: message.reciever 
            })
            const notif = {
                roomId: roomId,
                date:Date.now()
            }
            setNewMessage(notif)
        }else{
            console.log('Error occured')
        }
    }
    const sendRoom = async(_room) => {
        setroom(_room)
        setRoomId(_room.chatroom_id)
        if(fetchMessages(_room.chatroom_id)){
            setLoading(false)
        }else{
            console.log('Error')
        }
    }
    const saveMessage = async(message) => {
        const saved_message = await fetch(CHAT_STORAGE_API,{
            method: 'POST',
            headers:{
                'Content-type' : 'application/json'
            },
            body: JSON.stringify({
                chat_room: roomId,
                sender: message.sender,
                message: message.body
            })
        })
        
        if(saved_message.ok){
            updateChatroom(room.chatroom_id)
            if(room.creator === user_email){
                if(seenMember(roomId, 0)){return true}
                
            }else{
                if(seenCreator(roomId,0)){return true}
                
            }
        }else{
            console.log(saved_message.status)
            return false
        }
    }
    const fetchMessages = async (chat_room_id) => {
        const fetch_messages = await fetch(CHAT_STORAGE_API+'chat/'+chat_room_id) 
        if(fetch_messages.ok){
            setMessages(await fetch_messages.json())
            return true
        }else{
            console.log(fetch_messages.status)
            return false
        }
       
    }
    
    
    return {messages, sendMessage, sendRoom, newMessageRecieved, loading}

}

export default useChat;
