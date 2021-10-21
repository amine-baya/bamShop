import React, { useState } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../actions/cartAction'

const PaymentScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  if (!shippingAddress.address) {
    history.push('/shipping')
  }

  const [paymentMethod, setPaymentMethod] = useState('')

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod)) 
    history.push('/placeorder')
  }

  console.log(paymentMethod)

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3/>
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as='legend'>Select Method</Form.Label>
          <Col>
            <div>
              <input type="radio" id="huey" name="drone" value="paypal" onChange={(e) => setPaymentMethod(e.target.value)}/>
              <label for="huey">paypal</label>
            </div>  

            <div>
              <input type="radio" id="dewey" name="drone" value="strip" onChange={(e) => setPaymentMethod(e.target.value)}/>
              <label for="dewey">strip</label>
            </div>

            <div>
              <input type="radio" id="louie" name="drone" value="visa" onChange={(e) => setPaymentMethod(e.target.value)}/>
              <label for="louie">visa</label>
            </div>
           
          </Col>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  )
}

export default PaymentScreen