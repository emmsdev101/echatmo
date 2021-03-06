import React from 'react';
import { Alert, Button, Container, Form, FormControl, FormLabel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {useState} from 'react'
import Cookies from 'universal-cookie'
import './style.css'
import logo from './ee.png'
import Loading from '../../loading/loginSignupLoading/Loading'
const USER_API = 'https://serene-hamlet-21553.herokuapp.com/user/'


const Login = () => {
    const [email_input, setEmailInput] = useState('')
    const [passoword_input, setPasswordInput] = useState('')
    const [valid, setValid] = useState(true)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false);

    const cookies = new Cookies()
    const signIn = (e) => {
        setLoading(true)
        setValid(true)
        e.preventDefault()
        const user_data = {
            email: email_input,
            password: passoword_input,      
        }
        if(validate()){
            loginAccout(user_data)
        }

    }
    const loginAccout = async (user_data)=> {
        const request = await fetch(USER_API+'login/', {
            method: "POST",
            headers:{"content-type" : "application/json"},
            body: JSON.stringify({
                email: user_data.email,
                password: user_data.password,
            })
        })
        if(request.ok){
            const data = await request.json()
            if(data){
                cookies.set('username', user_data.email)
                window.location.replace('/')
            }else{
                setError('Wrong username or password')
                setValid(false)
            }
        }
        setLoading(false)
        
    }
    const validate = () => {
        if(email_input === '' || passoword_input === ''){
            setError('Do not leave any fields empty')
            setValid(false)
            setLoading(false)
            return false
        }else{
            return true
        }
    }
    const putEmail = (e) => {
        setEmailInput(e.target.value)
    }
    
    const putPassword = (e) => {
        setPasswordInput(e.target.value)
    }
    const showForm = () => {
        return (
            <Container className = 'form-container-inner'>
            
            <Container className = 'page-title'>
            <img className = 'logo' src = {logo} alt = 'logo'/>
                <h5>Login</h5>
                </Container>
                <Form onSubmit = {(e)=>{signIn(e)}}>
                {!valid?
                <Alert variant = 'danger'>{error}</Alert>:''
                }
                    <Form.Label className = 'form-label'>Email</Form.Label>
                    <Form.Control className = 'control' type ='email' value = {email_input} onChange = {(e)=>{putEmail(e)}}></Form.Control>
                    <Form.Label className = 'form-label' >Password</Form.Label>
                    <Form.Control className = 'control' type ='password' value = {passoword_input} onChange = {(e)=>{putPassword(e)}}></Form.Control>
                    
                    <Button className = 'submit' className ='submit' block varaint = 'primary' type ='submit'>Log in</Button>
                </Form> 
                <FormLabel>Don't have an accout yet?</FormLabel>
                <Button className ='signup' variant = 'secondary'block
                onClick = {()=>{window.location.replace('/sign-up')
                }}>Signup</Button>
                
            </Container>
        )
    }


    return (
        <>
        {loading?<Loading/>:''}
        <div fluid className = 'form-container'>
            {showForm()}
        </div>
        </>
    );
}

export default Login;
