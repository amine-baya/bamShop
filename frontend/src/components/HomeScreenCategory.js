
import React, { useEffect, useState } from 'react'
import { Tabs, Tab } from 'react-bootstrap'
import Product from './product/Product'
import { Link } from 'react-router-dom'

 
const HomeScreenCategory = (props) => {
   
    

    return (
        <section className="home_screen_section">
            <Link to={`/product/category/${props.category}`} className="single-product-categoryName">
            <h4 className='section_home_title'>{props.title}</h4>
            </Link>
            <hr />
            <div className="ciusine-section">
                <div>

                    <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
                      
                        <Tab eventKey="home" title="Top ventes">
                            <div className="cuisine">
                                
                                    
                                    {props.TopProduct.map((product) => (
                                        
                                            <div key={product._id}>
                                            <Product product={product} history={props.history} />
                                            </div>
                                        
                                    ))}
                                
                                
                            </div>

                        </Tab>
                        <Tab eventKey="profile" title="nouveaux">
                                <div className="cuisine">

                                    {props.NouveauxProduct.map((product) => (
                                        
                                        <div >
                                            <Product product={product} history={props.history} />
                                        </div>
                                        
                                    ))}
                                
                                
                            </div>
                        </Tab>
                        <Tab eventKey="contact" title="promo" >
                            <div className="cuisine">
                                
                               
                                    {props.PromosProduct.map((product) => (
                                       
                                            <div key={product._id}>
                                            <Product product={product} history={props.history} />
                                        </div>
                                        

                                    ))}
                                
                            </div>
                        </Tab>
                       
                    </Tabs>
                </div>

                <div className='recommande'>
                    <h6>Recommandé pour vous</h6>
                    {props.recommanderProduct.map((product) => (
                        <div key={product._id}>
                            <Product product={product} history={props.history} />
                        </div>
                    ))}
                </div>

            </div>


        </section>
    )

}



export default HomeScreenCategory
