import { useState, useEffect } from "react"
import { FaEllipsisV, FaUserCircle } from "react-icons/fa"
import Cookies from 'universal-cookie'
import {seenMember, seenCreator} from '../queries/ChatRoomQuery'
const USER_API = 'https://serene-hamlet-21553.herokuapp.com/user/'
const  Message =function({chat_room, setAsCurrentRoom}){
    const [user_data, setUserData] = useState({})
    const cookies = new Cookies()
    const recipient_email = cookies.get('username') 
    const [selected, setSelected] = useState(false)
    const [seen, setSeen] = useState(false)
    const [isSender, setSender] = useState(false)
    let user_email
    useEffect(() => {
        if(recipient_email === chat_room.creator){
            user_email = chat_room.member
            setSender(false)
            if(chat_room.seen_member === 1){
                setSeen(true)
            }else{
                setSeen(false)
            }
        }else{
            user_email = chat_room.creator
            setSender(true)
            if(chat_room.seen_creator === 1){
                setSeen(true)
            }else{
                setSeen(false)
            }
        }
        const getUserInfo = async()=>{
            const user_info = await fetchUserData()
            setUserData(user_info)
        }
        
        getUserInfo()
    }, []);
    const setCurrentRoom = ()=> {
        setAsCurrentRoom(chat_room)
        setSeen(true)
        if(isSender){
            seenCreator(chat_room.chatroom_id,1)
        }else{
            seenMember(chat_room.chatroom_id,1)   
        }
    }
    const selectMe = (state) => {
        setSelected(state)
    }
    const fetchUserData = async() => {
        const result = await fetch(USER_API+'info/', {
            method: 'POST',
            headers:{
                'Content-type' : 'application/json'
            },
            body: JSON.stringify({
                email: user_email
            })
        })
        return await result.json()
    }
    if(user_data.email !== undefined){
        return(
            <div style = {!seen?{color:'white',background: 'rgb(221, 127, 90)'}: {}}
            className = {selected? 'message-box1': 'message-box'} onClick = {()=>{setCurrentRoom()}}>
                <FaUserCircle className = 'profile'/>
                <div className = 'chat_details'>
                <h6>{user_data.firstname + ' ' + user_data.lastname}</h6>
                <p></p>
                </div>
            </div>
        )
    }
    return(
        <div className = {selected? 'message-box1': 'message-box'}>
            
        </div>
    )

    

}
export default Message