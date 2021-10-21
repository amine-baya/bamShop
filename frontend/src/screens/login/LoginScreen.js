import React, { useState, useEffect, useRef} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import FormContainer from '../../components/FormContainer.js'
import {login, facebook} from '../../actions/userActions.js'
import GoogleLogin from 'react-google-login'
import FacebookLogin from 'react-facebook-login'
import img from '../../img/login.svg'
import './login.css'
 


const LoginScreen = ({location, history}) => {
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('') 
    const [bool1, setbool1] = useState(false)
    const [bool2, setbool2] = useState(false)

    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const {loading, error, userInfo} = userLogin

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const input = useRef(null)

    console.log(password);

    useEffect(() => {
        if (userInfo) {
            history.push(redirect) 
            cartItems.map(cart => {
                if (cart.user === "") {
                    cart.user = userInfo._id
                }
            })
            localStorage.setItem('cartItems', JSON.stringify(cartItems))
        }

        if (true) {
            console.log("hell");
        }
        
    }, [history, redirect, userInfo, cartItems]) 

    const submitHandler = (e) => {
        e.preventDefault()

        dispatch(login(email, password))

    }
    const responseFacebook = (response) => {
        const name = response.name,
              email = response.email

        dispatch(facebook( name, email ))
    }
    const componentClicked = () => console.log('mri9el') 

    const responseSuccesGoogle = (response) => {
        const name = response.profileObj.givenName,
              email = response.profileObj.email

        dispatch(facebook( name, email ))

    }
    const responseErrorGoogle = (response) => { 
        console.log(response)
    }

    return (
        <section className='grid'>
            
           
                <form className='form' onSubmit={submitHandler}>
                {error && <Message variant='danger'>{error}</Message>}
                <h1 className='text-center'>bonjour</h1>
                <p className='text-center'>se connecter à ElectroMH ou <Link className="link" to={redirect ? `/register?redirect=${redirect}` : '/register'}>créer un compte</Link> </p>
                
                <div className='form_input'>
                    <label className={bool1 ? ' on' : 'label'}>Email Address</label>
                    <input
                    id='input'
                    type='email'
                    ref={input}
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                    onFocus={() => setbool1(true)}
                    onBlur={(e) => e.target.value.trim() ? setbool1(true) : setbool1(false)}>
                    </input>
                </div>

                <div className='form_input'>
                    <label className={bool2 ? ' on' : 'label'}>Password </label> 
                    <input type='password'
                    value={password}
                    onChange={(e) =>setpassword(e.target.value)}
                    onFocus={() => setbool2(true)}
                    onBlur={(e) => e.target.value.trim() ? setbool2(true) : setbool2(false)}>  
                    </input>
                </div>

                <Button type='submit' variant='primary' className='mr-3 button'>{ loading ?'Chargement...' : 'continuer'  }</Button>
                <span className='or'>ou</span>
                <div className='authen'>
                    <FacebookLogin
                        
                        appId="2573148416324666"
                        autoLoad={false}
                        isMobile={true}
                        fields="name,email,picture"
                        onClick={componentClicked}
                        callback={responseFacebook}
                        icon={<i className="fab fa-facebook-f icone"></i>}
                        textButton="continuer avec facebook"
                        disableMobileRedirect={true}
                    />

                    <GoogleLogin className='mybtn'
                        clientId="451290108071-6gicb4rkq3dl129h0e0om8j0b70uva21.apps.googleusercontent.com"
                        buttonText="continuer avec google"
                        onSuccess={responseSuccesGoogle}
                        onFailure={responseErrorGoogle}
                        cookiePolicy={'single_host_origin'}
                    />
                    
                    
                </div>
            </form>
            
            
            
        <div className='img'>
            <img src={img}></img>
        </div>
        </section>
    )
}

export default LoginScreen
