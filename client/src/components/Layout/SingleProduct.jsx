import React, { useEffect, useState } from 'react'
import styled from "styled-components"
import Button from "./Button"
import { IoMdCart } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import { useLocation } from 'react-router-dom';

const SingleProduct = () => {

    const location = useLocation();
    const [product, setproduct] = useState({})

    useEffect(() => {
        if (location.state) {
            setproduct(location.state?.product)
        }
    }, [])

    console.log("Location:", location.state);
    return (
        <Single>
            <div className="container">
                <div className="left_Side">
                    <div className="product_img">
                        <img src="/joystick.png" alt="" />
                    </div>
                </div>

                <div className="right_side">
                    <div className="product_info">
                        <h2 className="title">{product?.name}</h2>
                        <h5 className='price'>${product?.price}</h5>
                        <div className="variants">
                            <div className="color">
                                <h4>Color</h4>
                            </div>
                        </div>
                        <div className="products_excerpt">
                            <p>
                                {product?.description}
                            </p>
                        </div>
                        <div className="buttons">
                            <Button text={"ADD TO CART"} iconPosition={"left"} Icon={IoMdCart} />
                            <Button bg={"transparent"} style={{ border: "0px" }} text={"add to Wishlist"} iconPosition={"left"} Icon={FaHeart} />
                        </div>
                    </div>
                </div>

            </div>
        </Single>
    )
}

export default SingleProduct;

export const Single = styled.div`
    background-image: url("/BG.png");
    background-size:cover;
    background-repeat:no-repeat;
    background-position:center center;
    padding: 60px 0px;
    .container{
        display: flex;
        justify-content: center;
        align-items: center;
        max-width: 1150px;
        .product_info{
            display: flex;
            flex-direction: column;
            gap: 5px;
        }
    }
    .buttons{
        display: flex;
        align-items: center;
        gap: 33px;
        margin-top: 10px;
        button a{
            text-transform: uppercase;
        }
    }
    .left_Side{
        background-color: #0D5BDD;
        border-radius: 45px;
        width: 40%;
        img{
position: relative;
    z-index: 1;
        }
    }
    

    .right_side{
      background: rgba(60, 53, 99, 0.46); /* more transparent */
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px); /* Safari support */
  border-radius: 45px;
  width: 60%;
  padding: 50px 50px 50px 140px;
  position: relative;
  left: -140px;
  .title{
    font-size:50px ;
    font-weight:700;
    letter-spacing: 0px;
}
.tagline{
    font-size: 22px;
}
.price{
    font-size:26px;
    font-weight: 700;
}
.products_excerpt p{
    font-size: 14px;
}
    }

`
