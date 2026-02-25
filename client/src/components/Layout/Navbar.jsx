import { useDispatch, useSelector } from "react-redux";
import { toggleAccountSidebar, toggleAuthPopup } from "../../store/slices/authSlice";
import styled from "styled-components";
import { IoSearchOutline } from "react-icons/io5";
import { IoMdCart } from "react-icons/io";
import { useState } from "react";
import { toggleSearchAction } from "../../store/slices/searchSlice";
import { RiAccountCircle2Line } from "react-icons/ri";
import { Link } from "react-router-dom"

const Navbar = () => {
  let dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const handleAccount = () => {
    if (!isLoggedIn) {
      dispatch(toggleAuthPopup())
    }
    dispatch(toggleAccountSidebar())
  }

  return <NavBar className="bg-[#07132E] container py-[20px]">
    <Link to={"/"}><div className="logo"><img src="/Logo.png" alt="" /></div></Link>
    <ul className="nav_list">
      <li onClick={() => dispatch(toggleAuthPopup())} className="cursor-pointer">Account</li>
      <Link to={"/collections/all"}><li className="cursor-pointer">Collections</li></Link>
      <li onClick={() => dispatch(toggleSearchAction())}><IoSearchOutline cursor={"pointer"} /></li>
      <Link to={"/cart"}><li ><IoMdCart cursor={"pointer"} /></li></Link>
      <li onClick={handleAccount}><RiAccountCircle2Line cursor={"pointer"} /></li>
    </ul>

  </NavBar>;
};

export default Navbar;


const NavBar = styled.div`
    border-radius: 20px;
     box-shadow: 0px 0px 3px 0px #4586F1;
     display: flex;
    margin: 12px auto;
     justify-content: space-between;
     align-items: center;

     .nav_list{
      display: flex;
      gap: 10px;
      align-items: center;
     }
`