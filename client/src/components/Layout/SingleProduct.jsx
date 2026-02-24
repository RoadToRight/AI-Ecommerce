import React, { useEffect, useState } from 'react'
import styled from "styled-components"
import Button from "./Button"
import { IoMdCart } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/slices/cartSlice';
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";

const SingleProduct = () => {

    const location = useLocation();
    const [product, setproduct] = useState({});
    const [quantity, setquantity] = useState(1)
    const dispatch = useDispatch();

    useEffect(() => {
        if (location.state) {
            setproduct(location.state?.product)
        }
    }, [])


    const handleCart = (product) => {
        dispatch(addToCart({ product, quantity }))
    }

    const handleQuantity = () => {

    }

    return (
        <Single>
            <div className="container">
                <div className="left_Side">
                    <div className="product_img">
                        <img src={product?.images?.url} alt="" />
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
                        <div className="buttons_quantity">
                            <div className="quantity">
                                <CiCirclePlus size={30} onClick={() => setquantity((prev) => prev + 1)} cursor={"pointer"} />
                                <input type="number" min={1} max={50} value={quantity} onChange={(e) => setquantity(e.target.value ? e.target.value : 1)} />
                                <CiCircleMinus size={30} onClick={() => setquantity((prev) => prev > 0 ? prev - 1 : 0)} cursor={"pointer"} />
                            </div>
                            <div className="btns">
                                <Button text={"ADD TO CART"} iconPosition={"left"} Icon={IoMdCart} onClick={() => handleCart(product)} />
                                <Button bg={"transparent"} style={{ border: "0px" }} text={"add to Wishlist"} iconPosition={"left"} Icon={FaHeart} />
                            </div>
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
    .buttons_quantity{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 33px;
        margin-top: 10px;
        input{
            color: black;
            padding: 0px 7px;
        }
        button a{
            text-transform: uppercase;
        }
        .quantity{
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
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
