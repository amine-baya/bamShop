import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap'
import './navbar.css'

import {
    getAllCategory,
} from '../../actions/categoryAction'

const Navbar = () => {

    const dispatch = useDispatch()

    const categoryList = useSelector((state) => state.categoryList);
    const { loading, error, categories } = categoryList
   

    const [isSidebarOpen, setisSidebarOpen] = useState(false)

    const [isSubmenuOpen, setisSubmenuOpen] = useState(false)

    const [location, setlocation] = useState({})

    const [page, setpage] = useState({page: '', children: [] })

    const [columns, setcolumns] = useState('col-2')

    const openSidebar = () => {
        setisSidebarOpen(true)
    }
    const closeSidebar = () => {
        setisSidebarOpen(false)
    }
    const openSubmenu2 = () => {
        setisSubmenuOpen(true)
    }
    const openSubmenu = (text, coordinates) => {
        const page = categories.find((link) => link.name === text)

        setpage(page)

        setlocation(coordinates) 
        setisSubmenuOpen(true)
    }
    const closeSubmenu = () => {
        setisSubmenuOpen(false)
    }
    const displaySubmenu = (e) => {
        const page = e.target.textContent ;

        const tempBtn = e.target.getBoundingClientRect()

        const center = (tempBtn.left + tempBtn.right) / 2;

        const top = tempBtn.y + 35 + window.pageYOffset;

        openSubmenu(page, {center, top})
    }

    const container = useRef(null)

    const span = useRef(null)

    useEffect(() => {
        dispatch(getAllCategory())
    }, [])

    useEffect(() => {




        setcolumns('col-2')

       const submenu = container.current;

        const spanpos = span.current;

        const subpos = submenu.getBoundingClientRect()

       const  {center, top} = location;

       submenu.style.left = `${center  }px`

        submenu.style.top = `${top}px`

        spanpos.style.left = `${50}%`

        if (page.children.length === 3 ) {
        setcolumns('col-3')

            if (center - 319 < 0) {
                submenu.style.left = `${center - (center - 319) + 10}px`
                spanpos.style.left = `${center - 10}px`
            }

            if (window.innerWidth < 319 + center) {
                console.log(339 * 2 - (window.innerWidth - center)  - 20);
                submenu.style.left = `${window.innerWidth - 339}px`
                spanpos.style.left = `${339 * 2 - (window.innerWidth - center) - 20}px`
                
            }
           
            if (window.innerWidth > 768 && window.innerWidth < 993) {
                console.log(subpos.width / 2, center);
                if (center - 251 < 0) {
                    submenu.style.left = `${center - (center - 251) + 10}px`
                    spanpos.style.left = `${center - 10}px`
                } else {
                    submenu.style.left = `${center}px`

                    submenu.style.top = `${top}px`

                    spanpos.style.left = `${50}%`
                }


            }

            if (window.innerWidth > 768 && window.innerWidth < 993 && window.innerWidth < 251 + center) {
                submenu.style.left = `${window.innerWidth - 271}px`
                spanpos.style.left = `${251 * 2 - (window.innerWidth - center) + 20}px`

            }
    }
        
        if (page.children.length > 3) {
            setcolumns('col-4')

            if (center - 415 < 0) {
                // console.log(center - (center - 415) + center);
                submenu.style.left = `${center - (center - 415) + 10}px`
                spanpos.style.left = `${center - 10}px`
            }
            if (window.innerWidth < 415 + center) {
                submenu.style.left = `${window.innerWidth - 435}px`
                spanpos.style.left = `${415 * 2 - (window.innerWidth - center) + 20}px`

            }
           // console.log(center, subpos.width / 2, center - 415 , subpos.left);
            if (window.innerWidth > 768 && window.innerWidth < 993 ) {
                if (center - 327 < 0) {
                    submenu.style.left = `${center - (center - 327) + 10}px`
                    spanpos.style.left = `${center - 10}px`
                } else
                {
                    submenu.style.left = `${center}px`

                    submenu.style.top = `${top}px`

                    spanpos.style.left = `${50}%`
                }

                
                }
                
                if (window.innerWidth > 768 && window.innerWidth < 993 && window.innerWidth < 327 + center) {
                    submenu.style.left = `${window.innerWidth - 347}px`
                    spanpos.style.left = `${327 * 2 - (window.innerWidth - center) + 20}px`

                }
            

            
        } 

    }, [location])
    

    return (
        <section >
        <nav className="navv ">
            <div className="nav-center">
                <div className="nav-header">
                    <button className ="btnn toggle-btnn" onClick={openSidebar}>
                            <i className="fas fa-bars"></i>
                    </button>
                </div>
                   
                <ul className="nav-links"> 
                    {categories.map((category) => (
                            <li>
                                <LinkContainer to= {`/product/category/${category.slug}`}>
                                    <button className="link-btnn" onMouseOut={closeSubmenu} onMouseOver={displaySubmenu}>
                                    {category.name}
                                    </button>
                                </LinkContainer>

                            </li>
                     ))}
                     </ul>    
             
            </div>
        </nav>
        <aside className={`${isSidebarOpen ? 'sidebar-wrapper show' : 'sidebar-wrapper'}`}>
            <div className='sidebar'>
                <button className='close-btnn' onClick={closeSidebar}>
                    <i className="fas fa-times"></i>
                </button>
                <div className ="side-links">
                    {categories.map(
                        (item, index) => {
                            const {children, name} = item;
                            return (
                                <article key={index}>
                                <LinkContainer onClick={() => setisSidebarOpen(false)} to= {`/product/category/${item.slug}`}>
                                    <h4>{name}</h4>
                                    </LinkContainer>
                                    <div className="sidebar-sublinks">
                                        {children.map((link, index) => {
                                            const { slug, name} = link
                                            return (<>
                                            <ul className='sub_category'>
                                            <LinkContainer onClick={() => setisSidebarOpen(false)} to= {`/product/sub-category/${slug}`}>
                                                <a className='navbar_subCategory' key={index} href={slug}>{name}</a>
                                            </LinkContainer>
                                                  {
                                                      link.children.map((el, index) => {
                                                          const { name, slug } = el
                                                          return (<>
                                                        <li className="category-list">
                                                        <LinkContainer onClick={() => setisSidebarOpen(false)} to= {`/product/sub-category2/${slug}`}>
                                                            <a key={index} href={slug}>{name}</a>
                                                            </LinkContainer>
                                                        </li>
                                                    </>)
                                                })
                                            }
                                            </ul>
                                            </>)
                                        })}
                                    </div>
                                </article>
                            )
                        }    
                      )
                    }
                </div>
            </div>
         </aside>

         <aside  className={`${isSubmenuOpen ? 'submenu show' : 'submenu'}`} ref={container} id="close" onMouseOver={openSubmenu2} onMouseOut={closeSubmenu}> 
            <LinkContainer to= {`/product/category/${page.slug}`}>
                <a id="close" className="h4">{page.name}</a>
            </LinkContainer>
            <div className={`submenu-center ${columns}`}>
                {page.children.map((link, index) => {
                    const {name, slug} = link 
                    return (<>
                        <ul className="sub_category">
                        <LinkContainer to= {`/product/sub-category/${slug}`}>
                                <a key={index} href={slug} className='navbar_subCategory a'>
                            {name}   
                        </a>
                        </LinkContainer>
                        {link.children.map((el, index) => {
                            const { name, slug } = el
                            return (<>
                                <li className="category-list">
                                <LinkContainer to= {`/product/sub-category2/${slug}`}>
                                    <a key={index} href={slug}>{name}</a>
                                    </LinkContainer>
                                </li>
                            </>)
                        })}
                        </ul>
                    </>)
                })}
            </div>
                <span className='flesh' ref={span}></span>
         </aside>

    </section>
    )
}

export default Navbar
