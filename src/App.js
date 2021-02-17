import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Home from './components/Pages/Home';
import Login from './components/Pages/login/Login';
import SignUp from './components/Pages/signup/SignUp';
import Cookies from 'universal-cookie'
import {useState, useEffect} from 'react'

function App() {
  const cookie = new Cookies()
  const username = cookie.get('username')
  const [openFriends, setFriendsOpen] = useState(false)

  const setOpenFriends = (val)=> {
    alert(val)
  }
  return(
    <>
    <Router>
      <Switch>
        {username === undefined?
          (<Route exact path = '/' render = {(props)=>
          <Login {... props} Event = {'hey'}/>}/>):
         (<Route exact path = '/' render = {(props)=>
          <Home {... props} setFriendsOpen = {setOpenFriends}/>}/>)}
        {username === undefined ?
          (<Route exact path = '/log-in' render = {(props)=>
            <Login {... props} Event = {'hey'}/>}/>):
            (<Route exact path = '/log-in' render = {(props)=>
              <Home {... props} setFriendsOpen = {setOpenFriends}/>}/>)
      }{username === undefined ?
        (<Route exact path = '/sign-up' render = {(props)=>
          <SignUp {... props} Event = {'hey'}/>}/>):
          (<Route exact path = '/sign-up' render = {(props)=>
            <Home {... props} setFriendsOpen = {setOpenFriends}/>}/>)
    }
      </Switch>
    </Router>
    </>
  )
}

export default App;
