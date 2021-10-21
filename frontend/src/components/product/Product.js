import React from 'react'
import {Link} from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Rating from '../Rating'
import './product.css'
const Product = (props) => {


    
    const addToCartHandler = (id) => {

       props.history.push(`/cart/${id}/?qty=${1}`)
    }
    const remiseCalcul = 100 - ((100 * props.product.remise) / props.product.price)
    return (

        <div className='my-3 singel_product'> 
            
            <div>
                {props.product.remise ? <span className='remise'>{remiseCalcul.toFixed(0) } %</span> : <span className='noRemise'></span> }

            <div className="single-product-image-div">
                    <Link to={`/product/${props.product._id}?q=${props.product.subCategoryId2}`} >
                <img src={props.product.image[0]} className='img' variant='top' alt='product' /> 
            </Link>
            </div>
            </div>

            <div className="Product_body">
                <Link to={`/product/category/${props.product.category}`} className="single-product-categoryName">

                    <span >
                         {props.product.category}
                    </span>
                </Link>
                <div className="single-product-Name-div">
                    <Link to={`/product/${props.product._id}`} className="single-product-Name" >
                        <div>
                            <strong> {props.product.name}</strong>
                        </div>
                    </Link>
                </div>
               
                <Card.Text as='div' className='review'>
                    <Rating value={props.product.rating} text={`${props.product.numReviews} Avis`}  />
                </Card.Text>
                 </div>
               <div className='Product_footer'>
                    <div className="single-product-price-div"  >
                    {props.product.remise ? <> <Card.Text as='h6' className='price-line' > {props.product.price.toFixed(2)}€</Card.Text>
                        <Card.Text as='h5' className='price'>{props.product.remise.toFixed(2)}€</Card.Text>
                    </> : <Card.Text as='h5' className='price'>{props.product.price.toFixed(2)}€</Card.Text> }
               
               
                 

            </div>
            <div className="div-single-product-button" >
                <button
                    onClick={() => addToCartHandler(props.product._id)}
                    type='button'
                    disabled= {props.product.countInStock === 0}
                    className="single-product-button">ajouter</button> 
            </div>
               </div>
        </div>
    )
}

export default Product
