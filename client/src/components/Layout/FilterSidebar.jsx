import React from 'react'
import styled from 'styled-components'
import { useGetCollectionsQuery } from '../../store/api/collectionApi'

const FilterSidebar = () => {

    const { data, isLoading, isSuccess, isError } = useGetCollectionsQuery();

    return (
        <FilterSidebarSec>
            <div className="filter_container">
                <h3 className="filter_name">Collections</h3>
                <div className="filters">
                    <div className="filter">
                        <input type="checkbox" />
                        <label htmlFor="" className='name'></label>
                    </div>
                </div>
            </div>
        </FilterSidebarSec>
    )
}

export default FilterSidebar


const FilterSidebarSec = styled.div`
padding: 20px;

    .filter{
        display: flex;
        gap: 10px;
    }
`