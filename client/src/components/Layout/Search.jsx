import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { SiGooglegemini } from "react-icons/si";
import { IoSearchOutline } from "react-icons/io5";
import { MdCancel } from "react-icons/md";
import { toggleSearchAction } from "../../store/slices/searchSlice";


const Search = () => {

  const isSearchOpen = useSelector((state) => state.search.toggleSearch)
  const dispatch = useDispatch()

  return <SearchBar>
    <div className="container" style={{ top: `${isSearchOpen ? "0px" : "-100px"}` }}>
      <IoSearchOutline className="icon search_icon" />
      <input type="search" placeholder="Serarch Products..." />
      <SiGooglegemini className="icon gemini_icon" />
      <MdCancel className="cancel_icon icon" size={20} onClick={() => dispatch(toggleSearchAction())} cursor={"pointer"} />

    </div>

  </SearchBar>
};

export default Search;


const SearchBar = styled.div`
  
  .container{
position: fixed;
left:50%;
transform: translateX(-50%);
padding: 0px;
transition: all 300ms ease;
margin-top: 10px;
  }
.cancel_icon{
  position: absolute;
  right: 0px;
}
  input{
    padding:20px 35px 20px 40px;
    width:calc(100% - 30px);
    border-radius: 10px;
    background-color: black;
     border: 1px solid  #4586F1  ;
     box-shadow: 0px 0px 10px 0px #4586F1;
     color:#4586F1;
  }
  input::placeholder{
     color:#fff;
  }
  .icon{
    top: 50%;
    transform: translateY(-50%);
  }
  .search_icon{
    position: absolute;
    left: 20px;
  }
  .gemini_icon{
    position: absolute;
    right: 40px;
  }
`