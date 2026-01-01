import React from "react";
import { Star, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import styled from "styled-components"

const ProductCard = ({ name, price, description, img = [] }) => {


  return (
    <>
      <Link to={""}>
        <Card>
          <img src={img[0]?.url} />
          <div className="title_price">
            <h5 className="product-title">{name}</h5>
            <p className="price">${price}</p>
          </div>
          <p className="description">{description}</p>
        </Card>
      </Link>
    </>
  )
};

export default ProductCard;


const Card = styled.div`


    .main_head{
        font-size:32px;
        font-weight:700;
        }

    .title_price{
        display: flex;
        justify-content: space-between;
        align-items: center;

    }

`