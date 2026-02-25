import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { CiFilter } from "react-icons/ci";
import { useDispatch } from 'react-redux';
import ProductCard from '../Products/ProductCard';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useLazyGetCollectionsQuery } from '../../store/api/collectionApi';
import Loader from '../General/Loader';
// import { toggleFilterAction } from '../../store/slices/filterSlice'; // Uncomment if you have this

const Collection = () => {

    const dispatch = useDispatch();
    const Params = useParams();
    const [trigger, { data, isLoading, isSuccess }] = useLazyGetCollectionsQuery();

    const [products, setProducts] = useState([]);
    const [ProductsCount, setProductsCount] = useState(0)
    const [ProductsLimit, setProductsLimit] = useState(7)
    const location = useLocation();

    useEffect(() => {
        if (Params?.name) {
            trigger(Params.name)
        }
    }, [Params])

    useEffect(() => {
        if (data?.Collections?.length > 0) {
            setProducts(data.Collections)
            setProductsCount(data?.CollectionsCount?.total)
            setProductsLimit(data?.limit)
            console.log(data)
        } else {
            setProducts([])
        }
    }, [data, isSuccess])

    return (
        <CollectionPage>
            <div className="container">

                <div className="title">{Params?.name || "Collection Name"}</div>

                {/* SORT BAR */}
                <div className="filter_bar">
                    <div
                        className="filter_left"
                        onClick={() => dispatch({ type: "toggleFilter" })} // Replace with your action
                    >
                        <CiFilter />
                        <h5>Filter</h5>
                    </div>

                    <div className="filter_right">
                        <label>Sort by:</label>
                        <select>
                            <option>Featured</option>
                            <option>Best Selling</option>
                            <option>Price, low to high</option>
                            <option>Price, high to low</option>
                        </select>

                        <div className="total_products">
                            <h5>{ProductsCount} products</h5>
                        </div>
                    </div>
                </div>

                {/* MAIN CONTENT */}
                <div className="content">

                    {/* LEFT SIDEBAR FILTERS */}
                    <div className="sidebar">

                        <h4>Filters</h4>

                        <div className="filter_group">
                            <h5>Category</h5>
                            <label><input type="checkbox" /> Shoes</label>
                            <label><input type="checkbox" /> T-Shirts</label>
                            <label><input type="checkbox" /> Hoodies</label>
                        </div>

                        <div className="filter_group">
                            <h5>Price</h5>
                            <label><input type="checkbox" /> Under $50</label>
                            <label><input type="checkbox" /> $50 - $100</label>
                            <label><input type="checkbox" /> Above $100</label>
                        </div>

                        <div className="filter_group">
                            <h5>Brand</h5>
                            <label><input type="checkbox" /> Nike</label>
                            <label><input type="checkbox" /> Adidas</label>
                            <label><input type="checkbox" /> Puma</label>
                        </div>

                    </div>

                    {/* PRODUCTS */}
                    {isLoading ? (
                        <Loader />
                    ) : (
                        <div className="product_wrapper">
                            <div className="products">
                                {products?.map(({ name, price, description, images, slug }) => (
                                    <ProductCard
                                        key={name}
                                        name={name}
                                        price={price}
                                        description={description}
                                        img={images}
                                        slug={slug}
                                    />
                                ))}
                            </div>
                            <div className="pagination_wrapper">
                                {
                                    Array.from({ length: Math.ceil(Number(ProductsCount / ProductsLimit)) }, (_, i) => {
                                        return (
                                            <Link to={`${location?.pathname}/?page=2`}><div className="pagination">{i + 1}</div></Link>

                                        )
                                    })
                                }
                            </div>
                        </div>
                    )}

                    {/* {products.length < ProductsCount ? "2" : "1"} */}



                </div>
            </div>
        </CollectionPage>
    )
}

export default Collection


const CollectionPage = styled.div`
padding: 30px 0px;

.title{
    font-size: 34px;
    font-weight: 700;
}
.pagination_wrapper{
    padding: 50px 0px;
}
.pagination{
    background-color:#07132e ;
    width: max-content;
    padding: 7px 16px;
    border-radius: 100px;
    border: 2px solid hsl(217 91% 60%);
}
.filter_bar{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30px 0px;

    .filter_left{
        display: flex;
        gap: 10px;
        align-items: center;
        cursor: pointer;
    }

    .filter_right{
        display: flex;
        gap: 15px;
        align-items: center;
    }
}

.content{
    display: grid;
    grid-template-columns: 250px 1fr;
    gap: 40px;
}

/* SIDEBAR */
.sidebar{
    border-right: 1px solid #eee;
    padding-right: 20px;

    h4{
        margin-bottom: 20px;
    }

    .filter_group{
        margin-bottom: 30px;
        display: flex;
        flex-direction: column;
        gap: 10px;

        h5{
            margin-bottom: 10px;
            font-size: 16px;
        }

        label{
            display: flex;
            gap: 8px;
            font-size: 14px;
            cursor: pointer;
        }

        input{
            cursor: pointer;
        }
    }
}

/* PRODUCTS GRID */
.products{
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
}

/* Responsive */
@media (max-width: 992px){
    .content{
        grid-template-columns: 1fr;
    }

    .sidebar{
        border-right: none;
        border-bottom: 1px solid #eee;
        padding-bottom: 20px;
        margin-bottom: 20px;
    }

    .products{
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 576px){
    .products{
        grid-template-columns: 1fr;
    }
}
`