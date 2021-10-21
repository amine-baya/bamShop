import React, { useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SubCategory } from '../actions/productActions'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/product/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import './ProductCatageryScreenCss.css'
import Paginate from '../components/Paginate'

const ProductSubCategory = ({ match, history}) => {

    const pageNumber = match.params.pageNumber || 1

    const dispatch = useDispatch()
    const [grid, setgrid] = useState('grid_5')
    const [active, setactive] = useState('active1')
    const [active1, setactive1] = useState('')
    const [sorted, setSorted] = useState('');

    const productNavbar = useSelector((state) => state.productNavbar) 
    const { loading, error, products, page, pages } = productNavbar
    
    useEffect(() => {
        dispatch(SubCategory(match.params.category, pageNumber ))
    }, [match, dispatch])

    const sortArray = [{ id: 0, name: "nouveaux" }, { id: 1, name: "Nom, A à Z" }, { id: 2, name: "Nom, Z à A" }, { id: 3, name: "Prix, croissant" }, { id: 4, name: "Prix, décroissant" }]

    if (sorted === "nouveaux") {
        window.location.reload()

    }
 
    if (sorted === "Nom, A à Z") {
        products.sort((a, b) => a.name.toUpperCase().charCodeAt() - b.name.toUpperCase().charCodeAt())
    }

    if (sorted === "Nom, Z à A") {
        products.sort((a, b) => b.name.toUpperCase().charCodeAt() - a.name.toUpperCase().charCodeAt())

    }

    if (sorted === "Prix, croissant") {
        products.sort((a, b) => b.price - a.price)

    }

    if (sorted === "Prix, décroissant") {

        products.sort((a, b) => a.price - b.price)

    }
   
    return (
        <div>

            <div className="trier-bar" >
                <div className="trier-bar-grid">

                    <span onClick={() => { setgrid('grid_5'); setactive('active1'); setactive1('') }} > <i className={`fas fa-th fa-2x active ${active} `}></i> </span>
                    <span onClick={() => { setgrid('grid_1'); setactive(''); setactive1('active1') }}> <i className={`fas fa-bars active ${active1} `} ></i> </span>

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
            
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <>
                    <div className={grid}>
                        {products.map((product) => (
                            <div key={product._id} >
                                <Product product={product} history={history}/> 
                            </div>
                        ))}
                    </div>
                </>
            )}
            <Paginate pages={pages} page={page} isAdmin={false} category={'sub-category'} type={match.params.category} />
        </div>
    )
}

export default ProductSubCategory