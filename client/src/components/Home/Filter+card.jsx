import React from 'react'
import { useGetAllProductsQuery } from '../../store/api/productsApi';

const FilterCard = () => {

  const {data:products,error} = useGetAllProductsQuery();
  console.log(products,error)

    return (
        <div className='flex container gap-4 justify-center items-center py-[40px] px-[0px]'>
            <div className="filter w-[30%] flex flex-col gap-2 items-center justify-center">
                <label htmlFor="">Availibility</label>
                <input type="checkbox" />
                <label htmlFor="">Ratings</label>
                <input type="checkbox" />
                <label htmlFor="">Category</label>
                <input type="checkbox" />
                <label htmlFor="">Price</label>
                <input type="checkbox" />
            </div>
            <div className="card_map w-[70%]">

            </div>
        </div>
    )
}

export default FilterCard;
