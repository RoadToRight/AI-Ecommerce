import React, { useState } from 'react'
import styled from 'styled-components'
import Button from '../components/button'
import { useMutation } from '@tanstack/react-query'
import { axiosInstance } from '../libs/axiosInstance'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [LoginInfo, setLoginInfo] = useState({ email: "", password: "" })
    const navigate = useNavigate();

    const handleLogin = (e) => {

        const { name, value } = e.target;

        setLoginInfo((prev) => (
            { ...prev, [name]: value }
        ))
    }
    const handleLoginSubmit = async () => {
        
        let resp = await axiosInstance.post("/auth/login", LoginInfo)
        return resp.data;
    }
    const { mutate, data, isPending, isError } = useMutation({
        mutationFn: handleLoginSubmit,
        onSuccess: (data) => {
            toast.success(data?.message)
                navigate("/")
        },
        onError: (error) => {
            toast.error(error.response?.data?.message)
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        mutate();
    }

    return (
        <LoginSec>
            <div className="container_login">
                <h1>Login</h1>
                <div className="input">
                    <label>Email address</label>
                    <input type="email" name='email' required placeholder='john@dashdark.com' value={LoginInfo.Email} onChange={handleLogin} />
                </div>
                <div className="input">
                    <label>Password</label>
                    <input type="password" name='password' required placeholder='Password' value={LoginInfo.Password} onChange={handleLogin} />
                </div>
                <h6><a href="">Forgot Password?</a></h6>
                <Button text={"Login"} onClick={handleSubmit} loading={isPending} />
            </div>
        </LoginSec >
    )
}

export default Login

const LoginSec = styled.section`
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 20px;
    height: 100vh;
      background-color: var(--bg-main);
           .container_login{
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
          input{
        border: 1px solid #343B4F;
        background-color: #0B1739;
        padding: 14px ;
        border-radius: 8px;
        color: white;
    }
     input::placeholder{
          color: var(--color-list);
    }
`