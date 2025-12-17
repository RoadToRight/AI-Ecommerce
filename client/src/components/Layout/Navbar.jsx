import { Menu, User, ShoppingCart, Sun, Moon, Search } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import { useDispatch, useSelector } from "react-redux";
import { toggleAuthPopup } from "../../store/slices/authSlice";


const Navbar = () => {
  let dispatch = useDispatch();

  return <nav className="bg-black container py-[30px]">

    <ul>
      <li onClick={() => dispatch(toggleAuthPopup())} className="cursor-pointer">Account</li>
    </ul>

  </nav>;
};

export default Navbar;
