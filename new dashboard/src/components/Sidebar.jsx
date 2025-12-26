import React from 'react'
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { RiHomeFill } from "react-icons/ri";
import styled from "styled-components"
import { FiUsers } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";
import { IoSearchOutline } from "react-icons/io5";
import Button from './button';
import { useAppState } from '../customHooks/useAppState';
import { Link } from 'react-router-dom';

const Sidebar = () => {

    const { user } = useAppState()

    return (
        <Aside className='bg-[#081028]'>
            <div className="top_portion">
                <img src="/Logo.png" alt="" className='logo' />
                <div className="arrows_head">
                    <IoChevronBack size={12} color=' var(--color-list)' />
                    <IoChevronForward size={12} color=' var(--color-list)' />
                </div>
            </div>
            <div className="search_portion">
                <IoSearchOutline className='icon' color=' var(--color-list)' />
                <input type="search" placeholder='Search for...' />
            </div>
            <div className="dashboard_middle">
                <ul>
                    <li className='main_li'>
                        <span className='main_sub_li'> <span><RiHomeFill size={14} />Dashboard</span><IoChevronForward size={12} /></span>
                        <ul className='sub_li'>
                            <li className='main_li'>
                                <span className='main_sub_li'> <span>Products</span><IoChevronForward size={12} /></span>
                                <span className='main_sub_li'> <span>All Products</span></span>
                            </li>
                        </ul>
                    </li>
                    <li><span className='main_sub_li'><span><FiUsers size={14} />Users</span><IoChevronForward size={12} /></span></li>
                </ul>
            </div>
            <div className="dashboard_bottom">
                <ul>
                    <li><span className='main_sub_li'><span><IoSettingsOutline size={14} />Settings</span><IoChevronForward size={12} /></span></li>
                    <li><span className='main_sub_li'>
                        <div className='profile'>
                            <img width={32} height={32} src={user?.avatar?.url} alt="" className='small_avatar' /><div className="text"><h5>{user.name}</h5><h6><Link to={"/settings"}>Account Settings</Link></h6></div>
                        </div>
                        <IoChevronForward size={12} /></span>
                    </li>
                </ul>
                <Button text={"Logout"} />

            </div>
        </Aside>
    )
}

export default Sidebar;


const Aside = styled.aside`
    background-color: var(--bg-main);
    width: max-content;
    padding: 38px 28px;
    display: flex;
    flex-direction: column;
    /* gap: 20px; */
    height: calc(100vh);
    position: sticky;
    border-right: 2px solid #0b1739;
    li{
        color: var(--color-list);
    }
    .small_avatar {
        border-radius: 100px;
    }
    .active{
        background-color:#0a1330 ;
        border-left: 2px solid #CB3CFF;
        border-radius: 8px;
    }

    .top_portion{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .dashboard_middle{
        display: flex;
        justify-content: space-between;


    }
    ul{
            width: 100%;
                     display: flex; 
                     flex-direction: column;
                     /* gap: 20px; */
    }
    ul li .main_sub_li{
         display: flex; 
         justify-content: space-between;
         width: 100%;
         align-items: center;
         padding: 13px 5px;
    }
   .sub_li {

         width: 100%;

         padding: 0px 0px 0px   15px;
    }

      ul li span{
         display: flex; 
          align-items: center;
        gap: 6px;

    }
    .dashboard_middle ul li {
        flex-direction: column;
    }
    .arrows_head{
        display: flex;
    }
    .search_portion .icon{
        position: absolute;
        top: 50%;
        transform: translate(0%,-50%);
        left: 15px;
        
    }
    .search_portion {
        position: relative;
        /* padding-top: 20px; */
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
    .dashboard_bottom{
        display: flex;
        flex-direction: column;
        gap: 20px;;
    }
    .profile{
        display: flex;
        align-items: center;
        gap: 8px;
    }
`