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
    console.log(data);
    
   const CollectionOptions = data?.Collections.map(({name,id}) => {
        return {label:name,value:id}
    })

    return (
        <div>
            <Form data={addProduct} btnText={"Create Collection"} mutationKey={"addProduct"} reqType={"post"} reqUrl={"/collections/create"} />
        </div>
    )
}

export default AddProduct
