import React, { useEffect, useState } from 'react'
import Form from '../components/Form'
import { addProduct } from '../FormsConfig/AddProducts'
import { useQuery } from '@tanstack/react-query'
import { axiosInstance } from '../libs/axiosInstance'

const AddProduct = () => {

    const fetchCollections = async () => {
        const response = await axiosInstance.get("/collections/all")

        return response.data;
    }
    const { data, isLoading, isError } = useQuery({ queryKey: ["collections"], queryFn: fetchCollections, refetchOnWindowFocus: false, refetchOnReconnect: false })

    const CollectionOptions = data?.Collections.map(({ name, id }) => {
        return { label: name, value: id }
    })
    let updateAddProduct = [];
    updateAddProduct = addProduct.map((x) => {
        return {
            ...x,
            fields: x.fields.map((field) => {
                return field.name === "collections" ? { ...field, options: CollectionOptions } : field
            })
        }
    })
    console.log();


    return (
        <div>
            <Form data={updateAddProduct} btnText={"Create Product"} PreviewMode={true} mutationKey={"addProduct"} reqType={"post"} reqUrl={"/products/create"} />
        </div>
    )
}

export default AddProduct
