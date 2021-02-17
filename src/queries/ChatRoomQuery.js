import ChatBoxWrapper from "../components/ChatBoxWrapper"

const CHAT_ROOM_API = 'https://serene-hamlet-21553.herokuapp.com/room/'

export const fetchChatRoom = async (user_email)=> {
  const rooms = await fetch(CHAT_ROOM_API+'room/', {
    method: 'POST',
    headers:{
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      email: user_email
    })
  })
  if(rooms.ok){
    const result = await rooms.json()
    return result
  }else{
    console.log(rooms.status)
    return false
  }
  
}
export const checkRoom = async(curr_room)=>{
  const result = await fetch(CHAT_ROOM_API+'count/'+curr_room)
  const data = await result.json()
  return data

}
export const createRoom = async(room)=>{
  const create_room = await fetch(CHAT_ROOM_API,{
   method: 'POST',
   headers:{
     'Content-type':'application/json'
   },
   body: JSON.stringify({
    chatroom_id: room.chatroom_id,
    creator: room.creator,
    member: room.member,
    type: 'non-group'
   })
  })
  const data = await create_room.json()
  return data
}
export const updateChatroom = async(room, state) => {
  const to_update =  await fetch(CHAT_ROOM_API, {
    method: 'PUT',
    headers:{
      'Content-type' : 'application/json'
    },
    body: JSON.stringify({
      chatroom_id: room,
      seen: state
    })
  })
  if(to_update.ok){
    return true
  }else{
    console.log(to_update.status)
    return false
  }
  
  
}
export const getRoom = async(room_id)=>{
  const result = await fetch(CHAT_ROOM_API+'fetch/'+room_id)
  const data = await result.json()
  return data
}
export const seenCreator = async(room, val) => {
  const to_update =  await fetch(CHAT_ROOM_API+'seen-creator/', {
    method: 'PUT',
    headers:{
      'Content-type' : 'application/json'
    },
    body: JSON.stringify({
      chatroom_id: room,
      val:val
    })
  })
  if(to_update.ok){
    return true
  }else{
    console.log(to_update.status)
    return false
  }
}
export const seenMember = async(room, val) => {
  const to_update =  await fetch(CHAT_ROOM_API+'seen-member/', {
    method: 'PUT',
    headers:{
      'Content-type' : 'application/json'
    },
    body: JSON.stringify({
      chatroom_id: room,
      val:val
    })
  })
  if(to_update.ok){
    return true
  }else{
    console.log(to_update.status)
    return false
  }
}

