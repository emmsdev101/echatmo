import React from 'react';

const FriendItem = ({friend, setRoom}) => {
    const setChatroom = () => {
        setRoom(friend)
        
    }
    return (
        <div className = 'friend-item-div' onClick = {()=> {setChatroom()}}>
            <div className = 'friend-header'></div>
            <h6>{friend.firstname + ' ' + friend.lastname}</h6>
        </div>
    );
}

export default FriendItem;
