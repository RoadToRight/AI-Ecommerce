import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ToastContainer } from "react-toastify";

// Layout Components
import Navbar from "./components/Layout/Navbar";
import Sidebar from "./components/Layout/Sidebar";
import Search from "./components/Layout/Search";
import CartSidebar from "./components/Layout/CartSidebar";
import Footer from "./components/Layout/Footer";

// Pages
import Index from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Payment from "./pages/Payment";
import About from "./pages/About";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import SignupForm from "./components/Layout/signupForm";
import { use, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./store/slices/authSlice";
import SingleProduct from "./components/Layout/SingleProduct";
import Collection from "./components/Layout/Collection";
import Account from "./components/Layout/Account";

const App = () => {

  let dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user)
  const authPopupOpen = useSelector((state) => state.auth.authPopupOpen)


  useEffect(() => {
    dispatch(getUser());

  }, []);



  return (
    <>
      {
        authPopupOpen && <SignupForm />
      }


      <ThemeProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-background">
            <Navbar />
            <Sidebar />
            <Search />
            <CartSidebar />
            {/* <Account /> */}
            <Routes>
              <Route path="/collections" element={<Collection />} />
              <Route path="/" element={<Index />} />
              <Route path="/password/reset/:token" element={<Index />} />
              <Route path="/products/:name" element={<SingleProduct />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/about" element={<About />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
          </div>
          <ToastContainer />
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
};

export default App;
