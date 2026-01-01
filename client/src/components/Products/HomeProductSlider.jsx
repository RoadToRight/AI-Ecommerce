import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from "swiper/modules"
import useApi from '../../customHooks/useApi'
import { BsArrowRight, BsArrowLeft } from "react-icons/bs";

const HomeProductSlider = () => {
    const API = useApi()
    const [products, setProducts] = useState([1, 2, 3, 4, 5])

    const prevRef = useRef(null)
    const nextRef = useRef(null)

    useEffect(() => {
        const fetchProducts = async () => {
            const data = await API({ type: "get", url: "/products/all" })
            console.log(data)
            setProducts(data.Products)
        }
        fetchProducts()
    }, [API])

    return (
        <ProductSlider>
            <div className="left">
                <div className="main_head">Unsere Auswahl</div>
                <div className="tagline">Read More</div>
            </div>

            <div className="right">

                <div className="custom-nav">
                    <button ref={prevRef} className="nav-btn prev"><BsArrowLeft size={30} /></button>
                    <button ref={nextRef} className="nav-btn next"><BsArrowRight size={30} />
                    </button>
                </div>


                <Swiper
                    modules={[Navigation]}
                    navigation={false}
                    onBeforeInit={(swiper) => {
                        swiper.params.navigation.prevEl = prevRef.current
                        swiper.params.navigation.nextEl = nextRef.current
                    }}
                    slidesPerView={3}
                    spaceBetween={20}
                    breakpoints={{
                        0: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                >
                    {products.map((_, index) => (
                        <SwiperSlide key={index}>
                            <div className="img">
                                <img src="/joystick.png" alt="" />
                            </div>
                            <div className="title_price">
                                <h3 className="product-title">Cloud of unAwakening</h3>
                                <p className="price">$99.99</p>
                            </div>
                            <h4 className="collection">Men</h4>
                        </SwiperSlide>
                    ))}
                </Swiper>

            </div>
        </ProductSlider>
    )
}

export default HomeProductSlider



const ProductSlider = styled.div`

display:flex;
gap: 10px;
.left{
    width:25%;
    padding:20px;
    background-color:#786C6A;
    color:white;

    .main_head{
        font-size:32px;
        font-weight:700;
        }
}

.right{
width:75%;
}
.swiper{
    position:relative;
    .swiper-slide{

    }
      
}
    .custom-nav{
    display:flex;
    gap: 10px;
    justify-content: end;
    }
    .title_price{
        display: flex;
        justify-content: space-between;
        align-items: center;

    }

`