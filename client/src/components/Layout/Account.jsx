import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

const Account = () => {

    const accountSidebar = useSelector((state) => state.auth.accountSidebar);
    const user = useSelector((state) => state.auth.user);

    return (
        <AccountSec>
            {
                accountSidebar ? <div className="container">
                    <div className="avatar"><img src={user?.avatar} alt="" /></div>
                    <h4 className="name">{user?.name}</h4>
                    <h4 className="email">{user?.email}</h4>
                    <div className="options">
                        <h5>Orders</h5>
                        <h5>Loyalty Points</h5>
                        <h5>Settings</h5>
                    </div>
                </div> : <></>
            }

        </AccountSec>
    )
}

export default Account


const AccountSec = styled.div`
    
    position: fixed;
    right: 0px;
    background-color: #07132e;
    height: 100%;
    top: 0px;
        box-shadow: 0px 0px 3px 0px #4586F1;
        z-index: 3;

        .container{
            display: flex;
            gap: 10px;
            flex-direction: column;

            .options{
                display: flex;
                flex-direction: column;
                gap: 10px   ;
            }
        }

`