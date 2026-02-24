import React from 'react'
import styled from 'styled-components'
import { CiFilter } from "react-icons/ci";
import { useDispatch } from 'react-redux';
import useApi from '../../customHooks/useApi';
import { useState } from 'react';
import { useEffect } from 'react';
import ProductCard from '../Products/ProductCard';
import { Link } from 'react-router-dom';

const Collection = () => {
    let dispatch = useDispatch();
    const [products, setProducts] = useState([1, 2, 3, 4, 5])

    const API = useApi(false)
    useEffect(() => {
        const fetchProducts = async () => {
            const data = await API({ type: "get", url: "/products/all" })
            setProducts(data.Products)
        }
        fetchProducts()
    }, [API])



    return (
        <CollectionPage>
            <div className="container">
                <div className="title">Collection Name</div>
                <div className="filter">
                    <div className="filter_left" onClick={() => dispatch(toggleFilterAction())}><CiFilter /><h5>Filter</h5></div>
                    <div className="filter_right">
                        <label htmlFor="">Sort by:</label>
                        <select name="" id="">
                            <option value="">Featured</option>
                            <option value="">Best Selling</option>
                            <option value="">Price,low to high</option>
                            <option value="">Price,high to low</option>
                        </select>
                        <div className="total_products">
                            <h5>46 products</h5>
                        </div>
                    </div>
                </div>

                <div className="products">
                    {products?.map(({ name, price, description, images, slug }) => {
                        return (
                           <ProductCard name={name} price={price} description={description} img={images} slug={slug}/>
                        )
                    })}
                </div>
            </div>
        </CollectionPage>
    )
}

export default Collection

const CollectionPage = styled.div`
padding: 30px 0px;
.products{
    display: flex;
    gap: 20px;
}
    .title{
        font-size: 34px;
        font-weight: 700;
    }
    .filter{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 30px 0px;
        .filter_left{
            display: flex;
            gap: 10px;
            align-items: center;
        }
        .filter_right{
            display: flex;
            gap: 10px;
            align-items: center;
        }
    }

    .products{
        display: grid;
        grid-template-columns: repeat(4,1fr);
        place-content: center;
        place-items: center;
    }
`