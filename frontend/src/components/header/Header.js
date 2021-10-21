import React from 'react'
import {Route} from 'react-router-dom' 
import { useDispatch, useSelector } from "react-redux";
import {LinkContainer} from 'react-router-bootstrap'
import {Navbar, Nav,Container, NavDropdown} from 'react-bootstrap'
import SearchBox from '../SearchBox'
import  './header.css'
import { logout } from '../../actions/userActions';   
import logo_header from '../../img/logo_header.png'

const Header = ({history}) => {

    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin
    const cart = useSelector(state => state.cart)
    const { cartItems } = cart 

    let cartItem
    if (userInfo) {
        cartItem = cartItems.filter(cart => cart.user == userInfo._id);
    } else {
        cartItem = cartItems.filter(cart => cart.user == "");
    }
    
    const logoutHandler = () => {
        dispatch(logout())
        
    }
        return (
            <>
        <header>
            <Navbar  expand="lg" collapseOnSelect >
                
                    <LinkContainer to="/">
                            <span className="logo"> <img src={logo_header} className="header_logo"></img> </span>
                    </LinkContainer>
 
                        <Route render={({ history }) => <SearchBox history={history} dir={'search'} className={'d-none d-md-block'} />} />
                        
                        <Nav className="ml-auto">
                            <LinkContainer to="/cart" className="margin_logo" >
                                <span className="span cart_logo">
                                    <span className="cart_number" > {cartItem.length} </span>
                                    <i className='fas fa-shopping-cart'></i> 
                                </span>
                            </LinkContainer> 

                            {userInfo ? (<>
                                <NavDropdown title={<span> <i className='fas fa-user cart_logo drop_admin_name '></i> <span className={userInfo && userInfo.isAdmin ? 'd-none d-lg-inline' : 'icone'} >{userInfo.name}</span> <i className="fas fa-caret-down"></i> </span>} id='username' >
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/login'>

                                    <NavDropdown.Item onClick={logoutHandler}>Se déconnecter</NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown>
                                </>
                            ) : 
                                <LinkContainer to="/login" className="margin_logos">
                                    <span className='span menu_margin cart_logo'>
                                <i className='fas fa-user fa-1x  log_in_logo'></i> 
                                </span>
                             </LinkContainer>
                             }

                             {userInfo && userInfo.isAdmin && (
                                <NavDropdown title='Admin' id='adminmenu'>
                                <LinkContainer to='/admin/userlist'>
                                    <NavDropdown.Item>Client</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to='/admin/productlist'>
                                    <NavDropdown.Item>Produits</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to='/admin/orderlist'>
                                    <NavDropdown.Item>Commandes</NavDropdown.Item>
                                </LinkContainer>
                                    <LinkContainer to='/admin/categorylist'>
                                        <NavDropdown.Item>Catégories</NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown>
                                )
                             }

                        </Nav>
                    
                 
            </Navbar>
        </header>
         <Route render={({ history }) => <SearchBox history={history} className={'d-flex d-md-none '} />} />
        </>
    )
}

export default Header
