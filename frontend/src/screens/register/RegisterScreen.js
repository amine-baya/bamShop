import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Button, Col,  Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Message from '../../components/Message'


import img1 from '../../img/register.svg'
import {register} from '../../actions/userActions'
import './register.css'

const RegisterScreen = ({location, history}) => {
    const [bool1, setbool1] = useState(false)
    const [bool2, setbool2] = useState(false)
    const [bool3, setbool3] = useState(false)
    const [bool4, setbool4] = useState(false)
    const [name, setname] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [confirmPassword, setconfirmPassword] = useState('')
    const [message, setmessage] = useState(null)

    const dispatch = useDispatch()
    const userRegister = useSelector(state => state.userRegister)
    const {loading, error, userInfo} = userRegister

    const redirect = location.search ? location.search.split('=')[1] : '/'

     

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, redirect, userInfo])

    
        
    const submitHandler = (e) => {
        e.preventDefault()

        if( name.trim() === "") {
        setmessage("sorry you must put the name")
    } else {
            if( email.trim() === "") {
        setmessage("sorry you must put the email")
    } else {
        if(password.trim() === ""){
            setmessage("soory you must put the password")
        }else{
            if(password.length < 4 ) {
            setmessage("your password must be betwen 4 and 10")
        }else{
            if(password.length > 10) {
                setmessage("your password must be betwen 4 and 10")
            } else {
                if(password !== confirmPassword) {
                    setmessage('sorry the password don\'t match')
                    } else{
                        dispatch(register(name, email, password))
                    }
            }
             
        }
        } 
       
    }
 }


    }


    return (
        <section className='grid'>
            <form className='form' onSubmit={submitHandler}>
                <h1 className='text-center'>créer un compte</h1>
                <Row className='py-3 text-center'>
                    <Col>
                        have an account ? <Link className='link' to={redirect ? `login?redirect=${redirect}` : '/login'}>log In</Link>
                    </Col>
                </Row>
                {message && <Message variant='danger'>{message}</Message>}
                {error && <Message variant='danger'>{error}</Message>}
                <div className='form_input'>
                    <label className={bool1 ? ' on' : 'label'}>name</label>
                    <input type='text'
                        value={name}
                        onChange={(e) => setname(e.target.value)}
                        onFocus={() => setbool1(true)}
                        onBlur={(e) => e.target.value.trim() ? setbool1(true) : setbool1(false)}>
                    </input>
                </div>

                <div className='form_input'>
                    <label className={bool2 ? ' on' : 'label'}>email Address</label>
                    <input type='email'
                        value={email}
                        onChange={(e) => setemail(e.target.value)}
                        onFocus={() => setbool2(true)}
                        onBlur={(e) => e.target.value.trim() ? setbool2(true) : setbool2(false)}>
                    </input>
                </div>

                <div className='form_input'>
                    <label className={bool3 ? ' on' : 'label'}>password</label>
                    <input type='password'
                        value={password}
                        onChange={(e) => setpassword(e.target.value)}
                        onFocus={() => setbool3(true)}
                        onBlur={(e) => e.target.value.trim() ? setbool3(true) : setbool3(false)}>
                    </input>
                </div>
                
                <div className='form_input'>
                    <label className={bool4 ? ' on' : 'label'}>Confirm password</label>
                    <input type='password'
                        value={confirmPassword}
                        onChange={(e) => setconfirmPassword(e.target.value)}
                        onFocus={() => setbool4(true)}
                        onBlur={(e) => e.target.value.trim() ? setbool4(true) : setbool4(false)}>
                    </input>
                </div>
                <Button type='submit' className='button' variant='primary'>{loading ? 'Chargement...' : 'Sing In'}</Button>
                
            </form>
            <div className='img register'>
                <img src={img1} alt='register'></img>
            </div>
        </section>    
        
    )
}

export default RegisterScreen
