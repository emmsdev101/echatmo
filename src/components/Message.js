import { useState, useEffect, useReducer} from "react"
import { CloseButton } from "react-bootstrap"
import { FaEllipsisV, FaUserCircle } from "react-icons/fa"
import Cookies from 'universal-cookie'
import {seenMember, seenCreator, fetchOneRoom} from '../queries/ChatRoomQuery'
const USER_API = 'https://serene-hamlet-21553.herokuapp.com/user/'
const  Message =function({notification, room, setAsCurrentRoom, selectedRoom}){
    const [user_data, setUserData] = useState({})
    const cookies = new Cookies()
    const user_email = cookies.get('username') 
    const [selected, setSelected] = useState(false)
    const [seen, setSeen] = useState(true)
    const [isSender, setSender] = useState(false)
    const [new_room, setNewRoom] = useState({})
    let recipient_email 
    useEffect(() => {
   
        const setup = async () => {
            if(new_room.creator === user_email){
                recipient_email = new_room.member
                setSender(true)
                if(new_room.seen_creator === 1){
                    setSeen(true)
                }else{
                    setSeen(false)
                }
            }else{
                setSender(false)
                recipient_email = new_room.creator
                if(new_room.seen_member== 1){
                    setSeen(true)
                }else{
                    setSeen(false)
                }
            }
        }
        const getUserInfo = async()=>{

            const user_info = await fetchUserData()
            setUserData(user_info)
        }
    if(new_room.hasOwnProperty('chatroom_id')){
         setup()
         getUserInfo()
        
    }
    }, [new_room]);
    useEffect(async () => {
        let newroom = await getNewRoom(room.chatroom_id)
        setNewRoom(newroom)

    }, [notification]);

    const getNewRoom = async(id) => {
            const new_fetched_room = await fetchOneRoom(id)
            return new_fetched_room
        }
    const setCurrentRoom = ()=> {
        setAsCurrentRoom(new_room)
        setSeen(true)
        if(isSender){
            seenCreator(new_room.chatroom_id,1)
        }else{
            seenMember(new_room.chatroom_id,1)   
        }
    }
    const fetchUserData = async() => {
        const result = await fetch(USER_API+'info/', {
            method: 'POST',
            headers:{
                'Content-type' : 'application/json'
            },
            body: JSON.stringify({
                email: recipient_email
            })
        })
        return await result.json()
    }
    if(user_data.email !== undefined){
        return(
            <div style = {!seen?{color:'white',background: 'rgb(221, 127, 90)'}: {}}
            className = {selectedRoom===new_room.chatroom_id? 'message-box1': 'message-box'} onClick = {setCurrentRoom}>
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