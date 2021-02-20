import React, { useState } from 'react';
import { Alert, Button, Container, Form, FormControl, FormLabel, FormCheck, ButtonGroup, FormGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from './ee.png'

import './style.css'

const SignUp = () => {
    const [email_input, setEmailInput] = useState('')
    const [firstname_input, setFnameInput] = useState('')
    const [lastname_input, setLnameInput] = useState('')
    const [passoword_input, setPasswordInput] = useState('')
    const [repassoword_input, setRepasswordInput] = useState('')
    const [gender, setGender] = useState('');
    const [age, setAge] = useState('')
    const [valid, setValid] = useState(true)
    const [error, setError] = useState('')
    const USER_API = 'https://serene-hamlet-21553.herokuapp.com/user/'

    const signUp = async(e) => {
        e.preventDefault()
        setValid(true)

        if(validate()){
            const is_taken = await chekEmail(email_input)
            if(!is_taken){
                if(passoword_input === repassoword_input){
                     const user_data = {
                        email: email_input,
                        password: passoword_input,
                        firstname: firstname_input,
                        lastname: lastname_input,
                        gender: gender,
                        age:age}

                    const created = await createAccount(user_data)
                    if(created){
                        window.location.replace('/log-in')
                        alert('Sucess')
                    }else{
                        setValid(false)
                        setError('Something went wrong, try again.')
                    }
                }else{
                    setError('Password do not match')
                    setValid(false)
                }
               
            }else{
                setError('Email already used')
                setValid(false)
            }
           
        }else{
            setError('Do not leave any field empty')
            setValid(false)
        }


        
    }
    const createAccount = async (user_data)=> {
        const request = await fetch(USER_API, {
            method: "POST",
            headers:{"content-type" : "application/json"},
            body: JSON.stringify({
                email: user_data.email,
                password: user_data.password,
                firstname: user_data.firstname,
                lastname: user_data.lastname,
                gender: user_data.gender,
                age:user_data.age
            })
        })
        if(request.ok){
            const data = await request.json()
            console.log(data)
            return true
        }else{
            return false
        }
    }
    const chekEmail = async(email) => {
        const result = await fetch(USER_API+'check/'+email)
        if(result.ok){
            const is_taken = await result.json()
            if(is_taken){
                return true
            }else{
                return false
            }
        }console.log(result.status)
    }

    const putEmail = (e) => {
        setEmailInput(e.target.value)
    }
    const putFname = (e) => {
        setFnameInput(e.target.value)
    }
    const putLname = (e) => {
        setLnameInput(e.target.value)
    }
    const putPassword = (e) => {
        setPasswordInput(e.target.value)
    }
    const putRepassword = (e) => {
        setRepasswordInput(e.target.value)
    }
    const validate = () => {
        if(email_input !== '' && firstname_input !== '' && lastname_input !== '' &&
        passoword_input !== '' && repassoword_input !== '' && gender !== '' && age !== ''){
            return true
        }else{
             return false
        }
    }

    return (
        <Container fluid className = 'form-container-signup'>
        <Container className = 'form-container-inner-signup'>
        <Container className = 'page-title-signup'>
        <img className = 'logo-signup' src = {logo} alt = 'logo'/>
            <h5>Create Account</h5>
            </Container>
            <Form onSubmit = {(e)=>{signUp(e)}}>
            {!valid?<Alert variant="danger" size = 'sm'>{error}</Alert>:''}
            <Form.Control className = 'control-signup' type ='email'
                 value = {email_input} onChange = {(e)=>{putEmail(e)}}
                 placeholder = 'Email:'>
            </Form.Control>

            <Form.Control className = 'control-signup' type ='text'
                value = {firstname_input}
                onChange = {(e)=>{putFname(e)}}
                placeholder = 'Firstname:'>
            </Form.Control>
        
            <Form.Control className = 'control-signup' type ='text'
                value = {lastname_input}
                onChange = {(e)=>{putLname(e)}}
                placeholder = 'Lastname:'>
            </Form.Control>
            <Form.Control className = 'control-signup'
                type ='password'
                value = {passoword_input}
                onChange = {(e)=>{putPassword(e)}}
                placeholder = 'Password:'>
            </Form.Control>

            <Form.Control className = 'control-signup'
                type ='password'
                value = {repassoword_input}
                onChange = {(e)=>{putRepassword(e)}}
                placeholder = 're-type password:'>
            </Form.Control>
            <div className = 'gender-age-div'>
                    <Form.Control type = 'number' className = 'age-input' placeholder = 'Age:'
                        value = {age} onChange = {(e)=>{setAge(e.target.value)}}></Form.Control>
                <div className = 'gender-div'>
                    <FormLabel>Gender</FormLabel>
                    <Form.Check type ='radio'
                            label = 'Male' name = 'gender' id = '1' onClick = {()=>{setGender('Male')}}/>
                    <Form.Check type ='radio'
                        label = 'Fe-Male' name = 'gender' id = '2'onClick = {()=>{setGender('Fe-Male')}}/>
                </div>
                    
                
            </div>
            <hr></hr>
            <Button className = 'submit-signup' className ='submit' block varaint = 'primary' type ='submit'>Sign up</Button>
            </Form> 
            
            <Link to ='/log-in'>Log in here</Link>       
        </Container>
    </Container>
    );
}

export default SignUp;
