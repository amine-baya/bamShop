import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'
import Product from '../components/product/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import './ProductCatageryScreenCss.css'

const SearchScreen = ({ match, history }) => {
    const pageNumber = match.params.pageNumber || 1  
    const keyword = match.params.keyword
    
    const dispatch = useDispatch()
    const [grid, setgrid] = useState('grid_5')
    const [active, setactive] = useState('active1')
    const [active1, setactive1] = useState('')
    const [sorted, setSorted] = useState('');

    const productList = useSelector((state) => state.productList)
    const { loading, error, products } = productList

    useEffect(() => {
        
        dispatch(listProducts(keyword, pageNumber)) 
    }, [match, dispatch])


    if (!keyword) {
        history.push('/')
    }

    const sortArray = [{ id: 0, name: "nouveaux" }, { id: 1, name: "byNameA" }, { id: 2, name: "byNameB" }, { id: 3, name: "byPriceA" }, { id: 4, name: "byPriceB" }]

    if (sorted === "nouveaux") {
        window.location.reload()

    }

    if (sorted === "byNameA") {
        products.sort((a, b) => a.name.toUpperCase().charCodeAt() - b.name.toUpperCase().charCodeAt())
    }

    if (sorted === "byNameB") {
        products.sort((a, b) => b.name.toUpperCase().charCodeAt() - a.name.toUpperCase().charCodeAt())

    }

    if (sorted === "byPriceA") {
        products.sort((a, b) => b.price - a.price)

    }

    if (sorted === "byPriceB") {

        products.sort((a, b) => a.price - b.price)

    }
    return (
        <div>

            <div className="trier-bar" >
                <div className="trier-bar-grid">

                    <span onClick={() => { setgrid('grid_5'); setactive('active1'); setactive1('') }} > <i className={`fas fa-th fa-2x active ${active} `}></i> </span>
                    <span onClick={() => { setgrid('grid_1'); setactive(''); setactive1('active1') }}> <i className={`svg-inline--fa fa-th-list fa-w-16 fa-lg active ${active1} `} ></i> </span>

                </div>

                <div className=" total-product ">

                    <h6 className=" trier-bar-h6 " >il ya {products.length} products</h6>

                </div>

                <div className="select-sort-product">





                    <select
                        className="form-control form-control-sm  select-sort-product-select "
                        onChange={(e) => setSorted(e.target.value)}
                    >


                        {sortArray.map(sort => (

                            <option key={sort.id} value={sort.name} >
                                {sort.name}
                            </option>
                        ))

                        }
                    </select>
                    <span className="select-sort-produc-span"  > trier par :</span>
                </div>
            </div>
            <h1>Latest Products</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <>
                    <div className={grid}>
                        {products.map((product) => (
                            <div key={product._id} >
                                <Product product={product} history={history} />
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}

    
export default SearchScreen