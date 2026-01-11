import React, { useState } from 'react'
import styled from 'styled-components'
import Button from '../components/button'
import { useMutation } from '@tanstack/react-query'
import { axiosInstance } from '../libs/axiosInstance'
import { toast } from 'react-toastify'
import { useAppState } from '../customHooks/useAppState'
import Form from '../components/Form'
import { updateProductConfigFunction, updateProduct } from '../FormsConfig/UpdateProduct'
import { useLocation } from 'react-router-dom'


const UpdateProduct = () => {

    const { user } = useAppState();
    const [AddUserInfo, setAddUserInfo] = useState({ Email: "", Password: "", Avatar: null, Name: "", Role: "" })
    let location = useLocation();

    return (
        <AdduserSec>
            <div className="container_update_user">
                <h1>Update Product</h1>

                <Form data={updateProductConfigFunction(location.state.data)} btnText={"Update Product"} />

            </div>

        </AdduserSec >
    )
}

export default UpdateProduct

const AdduserSec = styled.div`
      display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 20px;
    height: 100vh;
      background-color: var(--bg-main);



           /* .container_update_user{
              display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 20px;
    min-width: 600px;
    margin: 0 auto;
     background-color: #0B1739;
           border: 1px solid #343B4F;
           border-radius: 12px;
    padding: 20px;

           }
       h1{
           color: white;
           font-weight:700;
           font-size: 24px;
       }
       h6{
           color: white;
           font-weight:700;
           text-decoration: underline;
           font-size: 14px;
           text-align: right;
       }
    label{
        color: white;
    }
    .input{
        display: flex;
        gap: 10px;
        flex-direction: column;
    }
          input,select{
        border: 1px solid #343B4F;
        background-color: #0B1739;
        padding: 14px ;
        border-radius: 8px;
        color: white;
    }
     input::placeholder{
          color: var(--color-list);
    }
    select{
        color: white;
         
    } */
`