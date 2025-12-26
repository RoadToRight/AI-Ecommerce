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

const Content = () => {


    return (
        <ContentDiv>

            <Routes>
                <Route path="users" element={<Users />} />
                <Route path="add/user" element={<Form data={addUser} btnText={"Add User"} mutationKey={"addUser"} reqType={"post"} reqUrl={"/auth/register"} />
                } />
                <Route path="settings" element={<UpdateUser />} />
                <Route path="collections/add" element={<Form data={addCollection} btnText={"Create Collection"} mutationKey={"addCollection"} reqType={"post"} reqUrl={"/collections/create"} />} />
                <Route path="products/add" element={<ProductCreateForm />} />
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