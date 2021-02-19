import React from 'react';
import './style.css'
const ChatboxMenu = ({current_room}) => {
    return (
        <div className = 'chatbox-menu'>
            <div onClick = {()=>{}}>Delete Conversation</div>
            <div onClick = {()=>{}}>Block</div>
            <div onClick = {()=>{}}>Settings</div>
        </div>
    );
}

export default ChatboxMenu;
