import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const SearchBox = (props) => {
  const [keyword, setKeyword] = useState('') 

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      props.history.push(`/${props.dir}/${keyword}`)    
    } else { 
      props.history.push( `/${props.noResult}` )
    }
  }
  return (
    <Form onSubmit={submitHandler} className={props.className} inline>
      <Form.Control
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='Je cherche...'
      ></Form.Control>
      <Button type='submit'>
        <i class="fas fa-search search_logo"></i>
      </Button>
    </Form>
  )
}

export default SearchBox