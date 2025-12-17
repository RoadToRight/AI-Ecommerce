import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Register, toggleAuthPopup } from '../../store/slices/authSlice'
import { MdOutlineCancel } from "react-icons/md";
const SignupForm = () => {

    const [Name, setName] = useState("")
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")


    const dispatch = useDispatch();
    const  isLoggedIn = useSelector((state) => state.auth.isLoggedIn)

    const handleOnclick = () => {
        dispatch(Register({ name: Name, email: Email, password: Password }))

    }
    const handleOnclickLogin = () => {
        dispatch(Login({ name: Name, email: Email, password: Password }))
    }
    return (
        <section className='fixed w-[100%] h-[100vh] flex justify-center items-center gap-[20px] flex-col bg-[#3b80f754] z-10 p-10'>

        <MdOutlineCancel onClick={() => dispatch(toggleAuthPopup())} className='fixed top-5 right-5' size={40} cursor={"pointer"}/>

            {
                !isLoggedIn && <input type="text" placeholder='Name' value={Name} onChange={(e) => setName(e.target.value)} /> 
            }

            <input type="text" placeholder='Email' value={Email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder='password' value={Password} onChange={(e) => setPassword(e.target.value)} />

            <button type='submit' className='bg-[#005eff]' onClick={handleOnclick}>Submit</button>

            <div onClick={handleOnclickLogin}>Login</div>
        </section>
    )
}

export default SignupForm
