import React from 'react';
import { FaUser } from 'react-icons/fa';

const FriendItem = ({friend, setRoom}) => {
    const setChatroom = () => {
        setRoom(friend)
        
    }
    return (
        <div className = 'friend-item-div' onClick = {()=> {setChatroom()}}>
            <FaUser/>
            <div className = 'friend-item-header'>
            <h6>{friend.firstname + ' ' + friend.lastname}</h6>
            </div>
            
        </div>
    );
}

export default FriendItem;
