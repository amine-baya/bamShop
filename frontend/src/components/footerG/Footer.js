import React from 'react'
import { Container} from 'react-bootstrap'


import './Footer.css'
const footer = () => {
    return (
        
            <>
            <section className="section_footer"  >

                <Container className="global_footer_grid">

                    <div className="global_footer_grid1">
                        <h5>nous contacter </h5>

                        <p className='footer_hover'> <span>Adresse : </span> rue imem chafii msaken sousse</p>

                        <p className='footer_hover'> <span>Appelez-nous : </span> 222222222</p>

                        <p className='footer_hover'> <span>ecriver-nous : </span> electoMH@gmail.com</p>

                        <div className='social_media'>

                            <a className="facebook_logo" href="https://www.facebook.com/electromh1/">
                                <span > <i className="fab fa-facebook-square fa-2x "></i> </span>

                           </a>
                            
                           

                            <span className="facebook_logo"><i className="fab fa-instagram-square fa-2x"></i></span>
                        </div>

                        


                    </div>

                    <div className="global_footer_grid2">
                        <h5>Service Client  </h5>

                        <p className='footer_hover'><span>Service Client</span></p>
                        <p className='footer_hover'>Solution de Livraison</p>
                        <p className='footer_hover'>Garantie et assurance</p>

                    </div>
                    <div className="global_footer_grid3">
                        <h5>VOTRE COMPTE  </h5>

                        <p className='footer_hover'>Informations personnelles</p>
                        <p className='footer_hover'>Commandes</p>
                        <p className='footer_hover'>Adresses</p>

                    </div>
                    </Container>
                    

                </section>

            </>
        
    )
}

export default footer
