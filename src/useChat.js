import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { updateChatroom } from "./queries/ChatRoomQuery";

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
    
    useEffect(()=>{
        socket.current = io(socketPort, {
            query: {roomId: roomId, username: user_email},
            
        })
        socket.current.on('chat message', (message)=>{
                    
            const recieviedMessage = {...message, sender:message.senderId}
            setMessages((messages) => [...messages, recieviedMessage])
        })
        socket.current.on('new_message', (msg)=> {
            setNewMessage(msg)
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
            setNewMessage(roomId)
        }else{
            console.log('Error occured')
        }
    }
    const sendRoomId = async(room_id) => {
        setRoomId(room_id)
        if(fetchMessages(room_id)){
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
            if(updateChatroom(roomId, false)){
                

                return true
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
    
    
    return {messages, sendMessage, sendRoomId, newMessageRecieved, loading}

}

export default useChat;
