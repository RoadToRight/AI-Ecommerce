import React from 'react'
import styled from 'styled-components'
import Users from '../pages/Users'
import { useAppState } from '../customHooks/useAppState'
import { Route, Routes } from 'react-router-dom'
import UpdateUser from '../pages/UpdateUser'
import CollectionCreateForm from '../pages/CollectionCreateForm'
import ProductCreateForm from '../pages/ProductCreateForm'
import Form from './Form'
import { addUser } from '../FormsConfig/AddUser'
import { addCollection } from '../FormsConfig/AddCollection'
import { addProduct } from '../FormsConfig/AddProducts'
import AddUser from '../pages/AddUser'
import AddCollection from '../pages/AddCollection'
import AddProduct from '../pages/AddProduct'
import Products from '../pages/Products'
import UpdateProduct from '../pages/UpdateProduct'
import Chart from './Chart'
import Hero from './Hero'

const Content = () => {


    return (
        <ContentDiv>

            <Routes>
                <Route path='/' element={<Hero />} />
                <Route path="users" element={<Users />} />
                <Route path='products' element={<Products />} />
                <Route path="add/user" element={<AddUser />} />
                <Route path="user/:id" element={<UpdateUser />} />
                <Route path="product/:id" element={<UpdateProduct />} />
                <Route path="collections/add" element={<AddCollection />} />
                <Route path="products/add" element={<AddProduct />} />
                <Route path='/chart' element={<Chart />} />
            </Routes>


        </ContentDiv>
    )
}

export default Content

const ContentDiv = styled.div`
    max-height: 100vh;
    overflow-y: auto;
    width: 100%;
    padding:34px 46px ;
    background-color: var(--bg-main);
`