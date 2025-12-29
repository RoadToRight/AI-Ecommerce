import React, { useEffect, useState } from 'react'
import Form from '../components/Form'
import { addProduct } from '../FormsConfig/AddProducts'
import { useQuery } from '@tanstack/react-query'
import { axiosInstance } from '../libs/axiosInstance'

const AddProduct = () => {

    const [collectionName, setcollectionName] = useState()
    const fetchCollections = async () => {
        const response = await axiosInstance.get("/collections/all")

        return response.data;
    }
    const { data, isLoading, isError } = useQuery({ queryKey: ["collections"], queryFn: fetchCollections, refetchOnWindowFocus: false, refetchOnReconnect: false })

    const CollectionOptions = data?.Collections.map(({ name, id }) => {
        return { label: name, value: id }
    })
    let updateAddProduct = [];
    updateAddProduct.map((x) => {
        
    })
    //  updateAddProduct = addProduct[0]?.fields?.map((x) => {
    //    return{MainHead:addProduct[0].MainHead, x.name === "collections" ? {...x,options:x.options = CollectionOptions} : x}
    // })
    console.log(updateAddProduct);

    return (
        <div>
            <Form data={updateAddProduct} btnText={"Create Product"} mutationKey={"addProduct"} reqType={"post"} reqUrl={"/collections/create"} />
        </div>
    )
}

export default AddProduct
