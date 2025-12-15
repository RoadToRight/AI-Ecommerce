import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Register } from '../../store/slices/authSlice'

const SignupForm = () => {

    const [Name, setName] = useState("")
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")


    const dispatch = useDispatch();
    const { isLoggedIn } = useSelector((state) => state.auth.isLoggedIn)

    const handleOnclick = () => {
        dispatch(Register({ name: Name, email: Email, password: Password }))

    }
    const handleOnclickLogin = () => {
        dispatch(Login({ name: Name, email: Email, password: Password }))
    }
    return (
        <section className='fixed w-[100%] h-[100vh] flex justify-center items-center gap-[20px] flex-col bg-[#3b80f754] z-10 p-10'>

            {
                isLoggedIn ? <input type="text" placeholder='Name' value={Name} onChange={(e) => setName(e.target.value)} /> : null
            }

            <input type="text" placeholder='Email' value={Email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder='password' value={Password} onChange={(e) => setPassword(e.target.value)} />

            <button type='submit' className='bg-[#005eff]' onClick={handleOnclick}>Submit</button>

            <div onClick={handleOnclickLogin}>Login</div>
        </section>
    )
}

export default SignupForm
