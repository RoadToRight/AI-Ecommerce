import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from "swiper/modules"
import useApi from '../../customHooks/useApi'
import { BsArrowRight, BsArrowLeft } from "react-icons/bs";
import { Link } from 'react-router-dom'
import { useGetPopularProductsQuery } from '../../store/api/productsApi'

const HomeProductSlider = () => {

    const [products, setProducts] = useState([1, 2, 3, 4, 5])

    const prevRef = useRef(null)
    const nextRef = useRef(null)

    const { data = [], isSuccess } = useGetPopularProductsQuery();


    useEffect(() => {
        if (isSuccess && data?.Products) {
            setProducts(data.Products || [])
        }

    }, [isSuccess])

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
                    {products.map(({ name, description, price, stock, images = [] }, index) => (
                        <Link to={`/products/${name}`}>
                            <SwiperSlide key={index}>
                                <div className="img">
                                    <img src={images[0]?.url} alt="" />
                                </div>
                                <div className="title_price">
                                    <h3 className="product-title">{name}</h3>
                                    <p className="price">${price}</p>
                                </div>
                                <h4 className="collection">Men</h4>
                            </SwiperSlide>
                        </Link>
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