import React from 'react'
import { FaArrowRight } from "react-icons/fa6";
import styled from 'styled-components';
import Loader from './Loader';

const Button = ({ text, url, bg, color, onClick, loading = false }) => {
    return (
        <Btn className='btn1' onClick={() => onClick()}>
            <button style={{
                background: `${bg ? bg : `linear-gradient(140deg,
      var(--btn-gradient-start) 20%,
      var(--btn-gradient-end) 68%)`}`
            }}>
                {
                    loading ? <Loader /> : <> <a href={url}>
                        {text}
                    </a>
                        <div className="icon">
                            <FaArrowRight size={16} />
                        </div></>
                }

            </button>
        </Btn>
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
  background: linear-gradient(140deg,
      var(--btn-gradient-start) 20%,
      var(--btn-gradient-end) 68%);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
}
`