import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap';
import ScrollToTop from './components/ScrollToTop' 
import Header from './components/header/Header';
import Navbar from "./components/navbar/Navbar.js";
import Footer from './components/footerG/Footer';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/productScreen/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/login/LoginScreen';
import AvisScreen from './screens/avis/AvisScreen';
import RegisterScreen from './screens/register/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/shippingScreen/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen'; 
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';
import ProductCreateScreen from './screens/ProductCreateScreen';
import ProductCatageryScreen from './screens/ProductCatageryScreen';
import ProductSubCategory from './screens/ProductSubCategory';
import ProductSubCategory2 from './screens/ProductSubCategory2';
import CategoryScreen from './screens/CategoryScreen';
import SearchScreen from './screens/SearchScreen'
import SocialMedia from './components/SocialMedia'






const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <Header />
      <Navbar />
      <main className='py-3'> 
        <Container>
          <Route path='/order/:id' component={OrderScreen} />
          <Route path='/placeOrder' component={PlaceOrderScreen} />
          <Route path='/payment' component={PaymentScreen} />    
          <Route path='/shipping' component={ShippingScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/login' component={LoginScreen} />
          <Route path='/avis' component={AvisScreen} />
          <Route path='/product/:id' exact component={ProductScreen} /> 
          <Route path='/product/category/:category' exact component={ProductCatageryScreen} />
          <Route path='/product/category/:category/:pageNumber' exact component={ProductCatageryScreen} />
          <Route path='/product/sub-category/:category' exact component={ProductSubCategory} />
          <Route path='/product/sub-category/:category/:pageNumber' exact component={ProductSubCategory} />
          <Route path='/product/sub-category2/:category' exact component={ProductSubCategory2} />
          <Route path='/product/sub-category2/:category/:pageNumber' exact component={ProductSubCategory2} />
          <Route path='/cart/:id?' component={CartScreen} />
          <Route path='/admin/userList' component={UserListScreen} exact />
          <Route path='/admin/user/:id/edit' component={UserEditScreen} />
          <Route path='/admin/userList/:pageNumber' component={UserListScreen} exact />

          <Route path='/admin/categoryList' component={CategoryScreen} />

          <Route path='/admin/productList' component={ProductListScreen} exact />
          <Route path='/admin/createproduct' component={ProductCreateScreen} exact />
          <Route path='/admin/productList/:pageNumber' component={ProductListScreen} exact />
          <Route path='/admin/orderList' component={OrderListScreen} exact /> 
          <Route path='/admin/orderList/:pageNumber' component={OrderListScreen} exact />
          <Route path='/undefined' component={HomeScreen} exact />
          <Route path='/admin/product/:id/edit' component={ProductEditScreen} />
          <Route path='/search/:keyword' component={SearchScreen} exact />
          <Route path='/page/:pageNumber' component={HomeScreen} exact />
          <Route path='/search/:keyword/page/:pageNumber' component={HomeScreen} exact />
          <Route path='/admin/search/productList/:keyword' component={ProductListScreen} exact />
          <Route path='/admin/search/productList/:keyword/page/:pageNumber' component={ProductListScreen} exact />
          <Route path='/admin/search/userList/:keyword' component={UserListScreen} exact />
          <Route path='/admin/search/userList/:keyword/page/:pageNumber' component={UserListScreen} exact />
          <Route path='/admin/search/orderList/:keyword' component={OrderListScreen} exact />
          <Route path='/admin/search/orderList/:keyword/page/:pageNumber' component={OrderListScreen} exact />
          <Route path='/' component={HomeScreen} exact />
        </Container>
      </main>
      <SocialMedia/>
      <Footer />
    </Router>
  );
}

export default App;
