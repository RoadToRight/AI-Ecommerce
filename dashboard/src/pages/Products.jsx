import React, { useEffect, useState } from 'react'
import { IoSearchOutline } from 'react-icons/io5'
import styled from 'styled-components'
import Button from '../components/button'
import SmallBox from '../components/SmallBox'
import { useQuery } from '@tanstack/react-query'
import { axiosInstance } from '../libs/axiosInstance'
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import Table from '../components/Table'
import { Link } from 'react-router-dom'

let UserBoxes = [
    { head: "Total Products", quantity: 250, url: "/totaluser.png" },
    { head: "New Products", quantity: 250, url: "/adminuser.png" },
]

const columns = [
    { accessorKey: "id", header: "Id", cell: (props) => <Link state={{data:props.row.original}} to={`/product/${props.row.original.id}`}><p>{props.getValue()}</p></Link> },
    { accessorKey: "name", header: "Name", cell: (props) => <Link to={`/product/${props.row.original.id}`}><p>{props.getValue()}</p></Link> },
    { accessorKey: "description", header: "Description", cell: (props) => <p>{props.getValue()}</p> },
    { accessorKey: "price", header: "Price", cell: (props) => <p>{props.getValue()}</p> },
    { accessorKey: "stock", header: "Stock", cell: (props) => <p>{props.getValue()}</p> }
]

const Products = () => {


    const fetchProducts = async () => {
        const { data } = await axiosInstance.get("/products/all");
        return data
    }


    const { data } = useQuery({
        queryKey: ['Products'],
        queryFn: fetchProducts,

    });
    const Products = data?.Products ?? []



    return (
        <Productsec>
            <div className='container_main'>
                <div className="top_portion">
                    <div className='head_search'>
                        <h2>Products</h2>
                        <div className="search_portion">
                            <IoSearchOutline className='icon' color=' var(--color-list)' />
                            <input type="search" placeholder='Search for...' />
                        </div>
                    </div>
                    <Button text={"Add User"} bg={"#CB3CFF"} url={"/add/user"} />
                </div>
                <div className="boxes_portion">

                    {
                        UserBoxes?.map(({ head, quantity, url }) => {
                            return (
                                <SmallBox key={head} heading={head} quantity={quantity} url={url} />
                            )
                        })
                    }
                </div>

                <Table data={Products} columns={columns} />

            </div>
        </Productsec>
    )
}

export default Products

const Productsec = styled.section`
h2{
    font-size: 20px;
    font-weight: 600;
    color: white;
}
        .search_portion .icon{
        position: absolute;
        top: 50%;
        transform: translate(0%,-50%);
        left: 15px;
        
    }
    .top_portion{
        display: flex;
        justify-content: space-between;
    }
    .search_portion {
        position: relative;
    }
    .boxes_portion{
        display: flex;
        width: 100%;
        justify-content: space-between;
  gap: 30px;

    }
    .head_search{
         display: flex;
         justify-content: center;
         align-items: center;
         gap: 50px;
    }
        .search_portion input{
        border: 1px solid #343B4F;
        background-color: var(--bg-secondary);
        padding: 10px 38px;
        border-radius: 8px;
    }
    .search_portion input::placeholder{
          color: var(--color-list);
    }
`