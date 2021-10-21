import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './Loader'
import Message from './Message'
import axios from 'axios'
import AddCarouselModal from './AddCarouselModel.js'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from 'react-responsive-carousel'
import { createProduct } from '../actions/productActions' 
import img1 from  '../img/ex1.jpg'


const ProductCarousel = () => {
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const dispatch = useDispatch()

  const [image, setImage] = useState([])
  const [Data, setdata] = useState([])
  const [show, setshow] = useState(false)  

  const productTopRated = useSelector((state) => state.productTopRated)
  const { loading, error} = productTopRated 

  const dispat = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const {data} = await axios.get('/api/upload/carousel', config)

    console.log(data,data[0]);

    if (data && data.length > 0) {
       setdata(data[data.length - 1].image)
    }else {
       setdata([img1])
    }
  }

  useEffect(() => {
   
    dispat()


  }, [dispatch, show])

 const uploadFileHandler = async (files) => {
    const file = files

    const formData = new FormData()

    for (let key of file) {
     
      formData.append('image', key)
    }

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post('/api/upload/carousel', formData, config)

      setImage(data.split(','))

      
    } catch (error) {
      console.error(error)
      
    }
  }
      console.log(image);

  const create = async () => {

    dispatch(
      createProduct({
            name: "carousel",
            remise: 0,
            price: 0,
            image,
            brand: "carousel",
            category: "carousel",
            description: "carousel",
            type: "carousel",
            countInStock: 0,
            recommander: false
        
      })
    )
 
      console.log("hello")


    setshow(false)
    }


  

  return loading ? (  <Loader /> ) : error ? ( <Message variant='danger'>{error}</Message>) : (<section className="carou">
    {userInfo && userInfo.isAdmin && (<span className="carouse_edit" onClick={() => setshow(true)}><i class="far fa-edit"></i></span>)}
    <Carousel showArrows={true} autoPlay={true} infiniteLoop={true} interval = {5000} >
      
      {image.length > 0 ? 
        image.map((el, ind) => (
            
            <div>
              <img src={el} alt="sorry" className="carousel_image"/>
            </div>
        
      
      )) : Data !== undefined && Data.map((el, ind) => (
            
            <div>
              <img src={el} alt="sorry" className="carousel_image"/>
            </div>
        
      ))}
    </Carousel>
    <AddCarouselModal
        show={show}
        handleclose={() => setshow(false)}
        modaltitle="change the carousel"
        uploadFileHandler={uploadFileHandler}
        onSubmit={create}
    />
  </section>
  )
}

export default ProductCarousel