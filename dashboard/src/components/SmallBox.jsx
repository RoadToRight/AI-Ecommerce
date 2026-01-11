import React from 'react'
import styled from 'styled-components'

const SmallBox = ({ heading, quantity, url }) => {
    return (
        <SmallBoxDiv>
            <div className="img"><img src={url} alt="" /></div>
            <div className="text_portion">
                <div className="heading">{heading}</div>
                <div className="quantity" style={{ fontSize: `12px` }}>{quantity}</div>
            </div>
        </SmallBoxDiv>
    )
}

export default SmallBox

const SmallBoxDiv = styled.div`
     border: 1px solid #343B4F;
     background-color: var(--bg-secondary);
     padding: 20px;
    border-radius: 10px;
    width: 100%;
    display: flex;
    gap: 12px;
    margin-top: 20px;
     .heading{
        font-weight: 600;
        color: white;
     }
     .quantity{
          color: var(--color-list);
     }
`