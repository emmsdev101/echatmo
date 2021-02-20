import React from 'react';
import { Button, Form, FormText, Row } from 'react-bootstrap';
import { FaAngleLeft, FaWindowClose } from 'react-icons/fa';
import FriendItem from './FriendItem';
import './Pages/styles/friendsStyle.css'
import { useEffect, useState} from "react";
import { fetchRecipient } from '../queries/UserQuery';
const USER_API = 'https://serene-hamlet-21553.herokuapp.com/user/'

const Friends = ({displayType, CloseMe, setRoom}) => {
    const [friends, setFriends] = React.useState([])
    const [searchtext, setSearchtext] = useState('');
    useEffect(() => {
        const getFriends = async () => {
            const friends_result = await fetchFriends()
            setFriends(friends_result)
        }
        getFriends()
    }, []);
    useEffect(() => {
      if(searchtext.length>0){
            searchUser(searchtext)
      }else{
        const getFriends = async () => {
            const friends_result = await fetchFriends()
            setFriends(friends_result)
        }
        getFriends()
      }
        
    }, [searchtext]);

    const fetchFriends = async () => {
        const friends = await fetch(USER_API+'fetch')
        const data =  await friends.json()
        return data
    }
    const setChatRoom = (friend) => {
        setRoom(friend)
    }
    const searchFriends = (e)=> {
        setSearchtext(e.target.value)
    }
    const searchUser = async(fullname) => {
        const users = await fetch(USER_API+'search/'+fullname)
        if(users.ok){
            const result = await users.json()
            setFriends(result)
            return true
        }else{
            console.log(users.status)
            return false
        }
    }
    return (
        <div className = {displayType? 'friends-div': 'hide'}>
            <Button className='btn-back' variant = 'outline' size='sm' onClick = {()=>{CloseMe()}}><FaWindowClose/></Button>
            <div className = 'friends-header'>
                <h6>To :</h6>
                <input type = 'text' className='search-control'
                placeholder = 'Type the name of the person'
                onChange = {(e)=> {searchFriends(e)}}
                value = {searchtext}/>
            </div>
            <hr></hr>
            <div className = 'friend-list-div'>
                {friends.length===0?<center>No results</center>:''}
               {friends.map((friend, id)=>(
                   <FriendItem friend = {friend} key = {id} setRoom = {setChatRoom}/>
               ))}
            </div>
        </div>
    );
}

export default Friends;
