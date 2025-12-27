import React from 'react'
import { FaArrowRight } from "react-icons/fa6";
import styled from 'styled-components';
import Loader from './Loader';

const Button = ({ text, url, bg, color, onClick = () => { }, loading = false, type = "submit", Icon = FaArrowRight, style, iconPosition }) => {
    console.log(bg);

    return (
        <Btn className='btn1' >
            <button onClick={(e) => onClick(e)} type={type} disabled={loading} style={{
                background: `${bg ? bg : `#0060FF`}`,
                ...style
            }}>
                {
                    loading ? <Loader /> : <div className='flex justify-center items-center gap-2' style={{ flexDirection: `${iconPosition === "left" ? "row-reverse" : "row"}` }}>  <a href={url}>
                        {text}
                    </a>
                        <div className="icon">
                            <Icon size={16} />
                        </div></div>
                }

            </button>
        </Btn >
    )
}

export default Button

const Btn = styled.div`
    button{
        display: flex;
        gap: 10px;
        justify-content: center;
        align-items: center;
    }
    button {
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 100px;
  cursor: pointer;
  border: 2px solid  #4586F1  ;
}
`