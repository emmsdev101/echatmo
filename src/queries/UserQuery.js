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