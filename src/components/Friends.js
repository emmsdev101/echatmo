import React from 'react';
import { Button, Form, FormText, Row } from 'react-bootstrap';
import { FaAngleLeft } from 'react-icons/fa';
import FriendItem from './FriendItem';
import './Pages/styles/friendsStyle.css'
import { useEffect } from "react";
const USER_API = 'https://serene-hamlet-21553.herokuapp.com/user/'

const Friends = ({displayType, CloseMe, setRoom}) => {
    const [friends, setFriends] = React.useState([])
    useEffect(() => {
        const getFriends = async () => {
            const friends_result = await fetchFriends()
            setFriends(friends_result)
        }
        getFriends()
    }, []);

    const fetchFriends = async () => {
        const friends = await fetch(USER_API+'fetch')
        const data =  await friends.json()
        return data
    }
    const setChatRoom = (friend) => {
        setRoom(friend)
    }
    return (
        <div className = {displayType? 'friends-div': 'hide'}>
            <div className = 'friends-header'>
                <Button className='btn-back' variant = 'outline' size='sm' onClick = {()=>{CloseMe()}}><FaAngleLeft className = 'back-icon'/></Button>
                <h6>To :</h6>
                <Form.Control size = 'sm' className='search-control'/>
            </div>
            <h6>Friends :</h6>
            <hr></hr>
            <div className = 'friend-list-div'>
               {friends.map((friend, id)=>(
                   <FriendItem friend = {friend} key = {id} setRoom = {setChatRoom}/>
               ))}
            </div>
        </div>
    );
}

export default Friends;
