import React, { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {  Image  } from 'react-bootstrap'
import Product from '../components/product/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import ProductCarousel from '../components/ProductCarousel'
import Meta from '../components/Meta'
import { listProductsFilter, listTopProducts, nouveauxProducts } from '../actions/productActions'
import { createAvis } from '../actions/userActions'
import Rating from '../components/Rating'
import MessengerCustomerChat from 'react-messenger-customer-chat'
import 'swiper/swiper-bundle.css';
import img1 from  '../img/ex1.jpg'
import img2 from  '../img/ex2.jpg'
import img3 from  '../img/ex3.jpg'

import HomeScreenCategory from '../components/HomeScreenCategory.js'
import SwiperCore, { Navigation, Pagination, } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react'; 

import './HomeScreenCss.css'

SwiperCore.use([Navigation, Pagination]);


const HomeScreen = ({ match, history }) => {

  const [rating, setrating] = useState(0)
  const [comment, setcomment] = useState("")

  const keyword = match.params.keyword

  const pageNumber = match.params.pageNumber || 1  

  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { loading, error, products   } = productList

  const productTopRated = useSelector((state) => state.productTopRated)
  const { products: topProducts } = productTopRated

  const productNouveaux = useSelector((state) => state.productNouveaux)
  const { products: nouveauxProduct } = productNouveaux

  useEffect( () => { 
    dispatch(listProductsFilter(keyword))

    dispatch(listTopProducts())

    dispatch(nouveauxProducts())

  
  }, [dispatch, keyword, pageNumber])


  /*************TOP************* */
  const topalimentation = topProducts.filter(el => el.category === 'ALIMENTATION')
  
  let alimentationTopProduct = []
  for (let index = 0; index < 8; index++) {
    if (topalimentation[index] !== undefined ) {
      alimentationTopProduct.push(topalimentation[index])
    }
    
  }
  const topelectro = topProducts.filter(el => el.category === 'five')
  
  let electroTopProduct = []
  for (let index = 0; index < 8; index++) {
    if (topelectro[index] !== undefined ) {
      electroTopProduct.push(topelectro[index])
    }
    
  }

  const topzrabi = topProducts.filter(el => el.category === 'zrabi')
  
  let zrabiTopProduct = []
  for (let index = 0; index < 8; index++) {
    if (topzrabi[index] !== undefined ) {
      zrabiTopProduct.push(topzrabi[index])
    }
    
  }
  /******************NOUVEAUX******************* */
  const nouveauxalimentation = nouveauxProduct.filter(el => el.category === 'ALIMENTATION')
  
  let alimentationNouveaux = []
  
  for (let index = 0; index < 8; index++) {
    if (nouveauxalimentation[index] !== undefined ) {
      alimentationNouveaux.push(nouveauxalimentation[index])
    } 
  }

  const nouveauxElectro = nouveauxProduct.filter(el => el.category === 'five')
  
  let electroNouveaux = []
  
  for (let index = 0; index < 8; index++) {
    if (nouveauxElectro[index] !== undefined ) {
      electroNouveaux.push(nouveauxElectro[index])
    } 
  }

  
  const nouveauxZrabi = nouveauxProduct.filter(el => el.category === 'zrabi')
  
  let zrabiNouveaux = []
  
  for (let index = 0; index < 8; index++) {
    if (nouveauxZrabi[index] !== undefined ) {
      zrabiNouveaux.push(nouveauxZrabi[index])
    } 
  }

  /***************PROMOTIION****************/

  const promos = products.filter(el => el.remise > 0)
  
  const promoCuisine = promos.filter(el => el.category === 'ALIMENTATION')

   let cuisinePromos = []
  
  for (let index = 0; index < 8; index++) {
    if (promoCuisine[index] !== undefined ) {
      cuisinePromos.push(promoCuisine[index])
    }
    
  }

  const promoElectro = promos.filter(el => el.category === 'five')

   let electroPromos = []
  
  for (let index = 0; index < 8; index++) {
    if (promoElectro[index] !== undefined ) {
      electroPromos.push(promoElectro[index])
    }
    
  }

  const promoZrabi = promos.filter(el => el.category === 'zrabi')

   let zrabiPromos = []
  
  for (let index = 0; index < 8; index++) {
    if (promoZrabi[index] !== undefined ) {
      zrabiPromos.push(promoZrabi[index])
    }
    
  }

  /***************ROCOMMENDER****************/ 

  const recommander = products.filter(el => el.recommander === true)

  const recommanderCuisine = recommander.filter(el => el.category === 'ALIMENTATION')

  let cuisineRecommander = []

  for (let index = 0; index < 9; index++) {
    if (recommanderCuisine[index] !== undefined) {
      cuisineRecommander.push(recommanderCuisine[index])
    }

  }

  const recommanderElectro = recommander.filter(el => el.category === 'five')

  let ElectroRecommander = []

  for (let index = 0; index < 9; index++) {
    if (recommanderElectro[index] !== undefined) {
      ElectroRecommander.push(recommanderElectro[index])
    }

  }

  const recommanderZrabi = recommander.filter(el => el.category === 'zrabi')

  let zrabiRecommander = [] 

  for (let index = 0; index < 9; index++) {
    if (recommanderZrabi[index] !== undefined) {
      zrabiRecommander.push(recommanderZrabi[index])
    }

  }
  

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const avisHandellor = (e) => {
    e.preventDefault()
    if (!userInfo) {
      history.push('/login')
    }
      dispatch(createAvis({
        rating, 
        comment
      }))
      history.push('/avis')
    
  } 
  const ratingHandallor = (tar) => {
    setrating(tar.id)
  }
  

  const responsive = {
    0: {
      
      slidesPerView: 2,
    },
    // when window width is >= 768px
    768: {
      
      slidesPerView: 3,
    },
    992: {
      slidesPerView: 4,
    },
    1200:
    {
      slidesPerView: 5,
    }

  }
    
  return (
    <>
      <Meta /> 
        
          <div className="part1">
                 

            <div className=" part1-one-1"> {<ProductCarousel className="carousell" />} </div>
           
            <div className="home_part part1-one-2">  <Link to='product/category/two'> <Image src={img1} alt="image" className="iia" ></Image></Link> </div>
            
             
               <div className="home_part part1-one-3">  <Link to='product/category/five'> <Image src={img2} alt="image" className="iia" ></Image></Link> </div>
              
               
               <div className="home_part part1-one-4"> <Link to='product/category/zrabi'> <Image src={img3} alt="image" className="iia" ></Image> </Link></div>
               
               
               <div className="home_part part1-one-5">  <Link to='product/category/two'><Image src={img1} alt="image" className="iia" ></Image> </Link> </div>
              
               
               <div className="home_part part1-one-6"> <Link to='product/category/two'> <Image src={img1} alt="image" className="iia" ></Image> </Link></div>
               
              
               <div className="home_part part1-one-7"> <Link to='product/category/two'> <Image src={img1} alt="image" className="iia" ></Image></Link> </div>
              


          </div>
      
            <section className="promis_product">
                <h4 className="h4">Nos Promotion</h4>
                <div className='product'>
                {
                  loading ? (
                    <Loader />
                  ) : error ? (
                    <Message variant='danger'>{error}</Message>
                  ) : (
                    <>
                      <div className="">
                      <Swiper 
                        spaceBetween={0}
                        breakpoints={responsive}
                        navigation
                        pagination={{ clickable: true }}
                    >
                        {promos.map((product) => (
                          <SwiperSlide key={product._id}>
                          <div >
                            <Product product={product} history={history}/>
                          </div>
                          </SwiperSlide>
                        ))}
                      </Swiper>
                      </div>
                    </>
                  )
                } 
                </div>
            </section>

      <HomeScreenCategory title="PISTACHES" TopProduct={alimentationTopProduct} NouveauxProduct={alimentationNouveaux} PromosProduct={cuisinePromos} recommanderProduct={cuisineRecommander} history={history} category="two"/>

      

      <HomeScreenCategory title="electroménager" TopProduct={electroTopProduct} NouveauxProduct={electroNouveaux} PromosProduct={electroPromos} recommanderProduct={ElectroRecommander} history={history} category="five"/>

      <HomeScreenCategory title="zrabi" TopProduct={zrabiTopProduct} NouveauxProduct={zrabiNouveaux} PromosProduct={zrabiPromos} recommanderProduct={zrabiRecommander} history={history} category="zrabi"/>

    <form className="rating_form" onSubmit={avisHandellor}>
        <h2>donnez votre avis</h2>
        <Rating className='rating' value={rating} ratingHandallor={(e) => ratingHandallor(e.target)} />
        <textarea className="text-avis"   required value={comment} onChange={(e) => setcomment(e.target.value)} />
        <input className="button" type="submit" />
        <Link to='/avis'>Visiter les autres Avis </Link>
      </form>
      
      
      <MessengerCustomerChat
        pageId="100000741984427"
        appId="2573148416324666"
      
      />
     
    </>)
  
}

 

export default HomeScreen
