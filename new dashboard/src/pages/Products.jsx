import React, { useEffect, useState } from 'react'
import { IoSearchOutline } from 'react-icons/io5'
import styled from 'styled-components'
import Button from '../components/button'
import SmallBox from '../components/SmallBox'
import { useQuery } from '@tanstack/react-query'
import { axiosInstance } from '../libs/axiosInstance'
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"

let UserBoxes = [
    { head: "Total Products", quantity: 250, url: "/totaluser.png" },
    { head: "New Products", quantity: 250, url: "/adminuser.png" },
]

const columns = [
    { accessorKey: "id", header: "Id", cell: (props) => <p>{props.getValue()}</p> },
    { accessorKey: "name", header: "Name", cell: (props) => <p>{props.getValue()}</p> },
    { accessorKey: "description", header: "Description", cell: (props) => <p>{props.getValue()}</p> },
    { accessorKey: "price", header: "Price", cell: (props) => <p>{props.getValue()}</p> },
    { accessorKey: "stock", header: "Stock", cell: (props) => <p>{props.getValue()}</p> }
]

const Products = () => {


    const fetchProducts = async () => {
        const { data } = await axiosInstance.get("/auth/Products");
        return data
    }


    const { data } = useQuery({
        queryKey: ['Products'],
        queryFn: fetchProducts,

    });
    const Products = data?.data ?? []

    const table = useReactTable({
        data: Products,
        columns: columns,
        getCoreRowModel: getCoreRowModel()
    })


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

                {/* Table Header */}
                {table.getHeaderGroups().map(headerGroup => (
                    <div key={headerGroup.id} style={{ display: 'flex', backgroundColor: '#f3f4f6' }}>
                        {headerGroup.headers.map(header => (
                            <div
                                key={header.id}
                                style={{
                                    flex: 1,
                                    padding: '10px',
                                    fontWeight: 'bold',
                                    borderRight: '1px solid #ddd'
                                }}
                            >
                                {flexRender(header.column.columnDef.header, header.getContext())}
                            </div>
                        ))}
                    </div>
                ))}

                {/* Table Body */}
                {table.getRowModel().rows.map(row => (
                    <div key={row.id} style={{ display: 'flex', borderTop: '1px solid #ddd' }}>
                        {row.getVisibleCells().map(cell => (
                            <div
                                key={cell.id}
                                style={{
                                    flex: 1,
                                    padding: '10px',
                                    borderRight: '1px solid #ddd'
                                }}
                            >
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </div>
                        ))}
                    </div>
                ))}

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