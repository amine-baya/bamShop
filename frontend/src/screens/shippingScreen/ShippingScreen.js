import React, {useState} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Button, Form} from "react-bootstrap";
import FormContainer from '../../components/FormContainer.js'
import CheckoutSteps from '../../components/CheckoutSteps'
import './ShippingScreen.css'

import { saveShippingAddress } from '../../actions/cartAction'

const ShippingScreen = ({history}) => {
    const cart = useSelector((state) => state.cart)
    const { shippingAddress } = cart
 

    const [address,setAddress] = useState(shippingAddress.address)
    const [city,setCity] = useState(shippingAddress.city)
    const [postalCode,setPostalCode] = useState(shippingAddress.postalCode)
    const [country,setCountry] = useState(shippingAddress.country)
 
  const [bool1, setbool1] = useState(false)
  const [bool2, setbool2] = useState(false)
  const [bool3, setbool3] = useState(false)
  const [bool4, setbool4] = useState(false)
  const dispatch = useDispatch() 

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress({ address, city, postalCode, country }))
    history.push('/payment') 
    
  }

    return (
        <FormContainer>
          <div className="shipping">
            <CheckoutSteps step1 step2 />
          <h2>livraison </h2>
          <Form onSubmit={submitHandler} >
            <div className='form_input'>
              <label className={bool1 || address ? ' on' : 'label'}>Nom et Prénom</label>
              <input
                id='input'
                type='text'
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                onFocus={() => setbool1(true)}
                onBlur={(e) => e.target.value.trim() ? setbool1(true) : setbool1(false)}>
              </input>
            </div>

            <div className='form_input'>
              <label className={bool2 || city ? ' on' : 'label'}>Adresse De Livraison</label>
              <input
                id='input'
                type='text'
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onFocus={() => setbool2(true)}
                onBlur={(e) => e.target.value.trim() ? setbool2(true) : setbool2(false)}>
              </input>
            </div>

            <div className='form_input'>
              <label className={bool4 || country ? ' on' : 'label'}>Ville</label>
              <input
                id='input'
                type='text'
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                onFocus={() => setbool4(true)}
                onBlur={(e) => e.target.value.trim() ? setbool4(true) : setbool4(false)}>
              </input>
            </div>
            
            <div className='form_input'>
              <label className={bool3 || postalCode ? ' on' : 'label'}>Numéro de Teléphone</label>
              <input
                id='input'
                type='text'
                required
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                onFocus={() => setbool3(true)}
                onBlur={(e) => e.target.value.trim() ? setbool3(true) : setbool3(false)}>
              </input>
            </div>


            
          
            <Button type='submit' variant='primary' className='mr-3 button'>continuer</Button>
          </Form>
          </div>
        </FormContainer>
    )
}

export default ShippingScreen
