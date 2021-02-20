const USER_API = 'https://serene-hamlet-21553.herokuapp.com/user/'
  export const fetchRecipient = async(remail) => {
    const recipient = await fetch(USER_API+'info/',{
      method: 'POST',
      headers:{
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        email: remail
      })
    })
    const data = await recipient.json()
    return data
  }
export const searchUser = async(fullname) => {
    const users = await fetch(USER_API+'search/'+fullname)
    if(users.ok){
        const result = await users.json()
        return result
    }else{
        console.log(users.status)
        return false
    }
}
export const updateUser = async(userData)=>{
    const updated = await fetch(USER_API+'update/',{
      method: 'PUT',
      headers:{
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        email:userData.email,
        firstname:userData.firstname,
        lastname:userData.lastname,
        gender:userData.gender,
        age:userData.age
      })
    })
    if(updated.ok){
      const data = updated.json()
      return data
    }else{
      console.log(updated.status)
      return false
    }
}