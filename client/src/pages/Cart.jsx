import { Plus, Minus, Trash2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/slices/cartSlice";

const Cart = () => {

  const cart = useSelector((state) => state.cart.cart);

  return <>

    {cart.length === 0 ? <div className="empty_cart">
      <h2>Your cart is empty</h2>
      <Link to={"/collections/all"} className="btn">Go to Shop</Link></div>
      : <div className="cart_page">
        <div className="cart_items">
          {
            cart?.map((item) => {
              return (
                <div className="cart_item">
                  <div className="img"><img src="" alt="" /></div>
                  <h4>{item?.product?.name}</h4>
                </div>
              )
            })
          }

        </div>
      </div>
    }
  </>;
};

export default Cart;
