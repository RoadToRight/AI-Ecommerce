import React from 'react'
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { RiHomeFill } from "react-icons/ri";
import styled from "styled-components"
import { FiUsers } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";
import { IoSearchOutline } from "react-icons/io5";
import Button from './button';

const Sidebar = () => {
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
                        <li className='sub_li'>Products</li>
                    </li>
                    <li><span className='main_sub_li'><span><FiUsers size={14} />Users</span><IoChevronForward size={12} /></span></li>
                </ul>
            </div>
            <div className="dashboard_bottom">
                <ul>
                    <li><span className='main_sub_li'><span><IoSettingsOutline size={14} />Settings</span><IoChevronForward size={12} /></span></li>
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

    li{
        color: var(--color-list);
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

         padding: 13px 5px;
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
`