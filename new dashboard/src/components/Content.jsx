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

const Content = () => {


    return (
        <ContentDiv>

            <Routes>
                <Route path="users" element={<Users />} />
                <Route path="add/user" element={<AddUser />} />
                <Route path="settings" element={<UpdateUser />} />
                <Route path="collections/add" element={<AddCollection />} />
                <Route path="products/add" element={<AddProduct />} />
            </Routes>
        </ContentDiv>
    )
}

export default Content

const ContentDiv = styled.div`
    max-height: 100vh;
    overflow-y: auto;
    width: 100%;
`