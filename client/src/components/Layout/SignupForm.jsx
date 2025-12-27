import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Register, toggleAuthPopup, Login } from '../../store/slices/authSlice'
import { MdOutlineCancel } from "react-icons/md";

const SignupForm = () => {
    const [formInfo, setformInfo] = useState({})
    const [ToggleLogin, setToggleLogin] = useState(true)

    const dispatch = useDispatch()
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)

    const handleChange = (e) => {
        const { name, value } = e.target;

        setformInfo((prev) => ({ ...prev, [name]: value }))
    }
    useEffect(() => {
        console.log(formInfo);

    }, [formInfo])


    const handleSubmit = () => {

        if (ToggleLogin) {
            dispatch(Login(formInfo))
        } else {
            dispatch(Register(formInfo))
        }

    }

    return (
        <section className="fixed inset-0 z-10 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">

            {/* Close Button */}
            <MdOutlineCancel
                onClick={() => dispatch(toggleAuthPopup())}
                className="absolute top-6 right-6 text-white hover:text-red-400 transition cursor-pointer"
                size={36}
            />

            {/* Card */}
            <div className="w-full max-w-md bg-[#07132e] rounded-2xl shadow-xl p-8 space-y-6">

                {/* Title */}
                <h2 className="text-2xl font-bold text-center ">
                    {isLoggedIn ? "Login" : "Create Account"}
                </h2>

                {/* Name */}
                {!ToggleLogin && (
                    <input
                        type="text"
                        placeholder="Name"
                        value={formInfo?.name}
                        onChange={handleChange}
                        name="name"
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                )}

                <input
                    type="email"
                    placeholder="Email"
                    value={formInfo?.email}
                    name="email"
                    onChange={handleChange}
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={formInfo?.password}
                    name="password"
                    onChange={handleChange}
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />



                {/* Primary Button */}
                <button
                    onClick={handleSubmit}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                    {ToggleLogin ? "Login" : "Sign Up"}
                </button>

                {/* Divider */}
                <div className="flex items-center gap-3">
                    <div className="flex-1 h-px bg-gray-300" />
                    <span className="text-sm text-gray-400">OR</span>
                    <div className="flex-1 h-px bg-gray-300" />
                </div>

                {/* Secondary Action */}
                <button
                    onClick={() => { setToggleLogin((prev) => !prev); setformInfo({}) }}
                    className="w-full border border-blue-600 text-blue-600 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
                >
                    {ToggleLogin ? "Sign Up" : "Login"}
                </button>
            </div>
        </section>
    )
}

export default SignupForm
