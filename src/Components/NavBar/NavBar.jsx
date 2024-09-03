import React, { useContext,useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { UserContext } from '../../Context/UserContext';
import { CartContext } from '../../Context/CartContext';
import logo from "../../assets/imgs/logo.svg"


export default function NavBar() {
  let navigate = useNavigate();

let {userLogin, setuserLogin}=   useContext(UserContext);
 const {numbOfCartItem} = useContext(CartContext)
function logOut(){
  localStorage.removeItem("userToken");
  setuserLogin(null);
  navigate("/Login")
}
  return (
<nav className="bg-white border-gray-200 fixed top-0 right-0 left-0 z-50 ">
  <div className="max-w-screen-xl flex gap-5 flex-wrap items-center mx-auto p-4 ">
    <a  className="flex items-center space-x-3 rtl:space-x-reverse">
      <img src={logo} className="h-8"  />

    </a>
    <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 ms-auto justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
      <span className="sr-only">Open main menu</span>
      <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
      </svg>
    </button>
    <div className="hidden w-full lg:flex justify-between items-center lg:w-auto  grow " id="navbar-default">
      <ul className="font-medium flex flex-col p-4 lg:p-0 mt-4 border border-gray-100 rounded-lg  lg:flex-row lg:space-x-8 rtl:space-x-reverse lg:mt-0 lg:border-0 justify-center items-center">
       {userLogin !== null ? <>
        <li>
          <Link to="" 
          className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0 dark:text-white lg:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent">Home</Link>
        </li>
        <li>
          <Link to="products" 
          className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0 dark:text-white lg:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent">Products</Link>
        </li>
        <li>
          <Link to="categories" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0 dark:text-white lg:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent">Categories</Link>
        </li>
        <li>
          <Link to="brands" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0 dark:text-white lg:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent">Brands</Link>
        </li>
        <li>
          <Link to="wish" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0 dark:text-white lg:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent">WishList</Link>
        </li>
        <li>
          <Link to="cart" className=" py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0 flex justify-center items-center ">
            Cart
           <span className='relative'>
             <i className='fa-solid text-2xl fa-cart-shopping text-green-600 mx-2'></i>
             <span className='absolute -top-2 -right-2 text-white bg-green-900 rounded-full w-5 h-5 flex justify-center items-center'>
             {numbOfCartItem}
              </span>
             </span>
          
            </Link>
       
        </li>
       </> : null}
      
      </ul>
      <ul className="font-medium flex items-center flex-col p-4 lg:p-0 mt-4 border border-gray-100 rounded-lg  lg:flex-row lg:space-x-8 rtl:space-x-reverse lg:mt-0 lg:border-0  dark:bg-gray-800 lg:dark:bg-gray-900 dark:border-gray-700">
       {userLogin === null ? <>
        <li>
          <Link to="login" 
          className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0 dark:text-white lg:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent">Login</Link>
        </li>
        <li>
          <Link to="register" 
          className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0 dark:text-white lg:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent">Register</Link>
        </li>
       </> :  <li onClick={logOut}>
          <span 
          className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0 dark:text-white lg:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent cursor-pointer">Sign Out</span>
        </li>}
     
       
        <li className='flex gap-4'>
          <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0 dark:text-white lg:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent">
<div>
  <i className="fa-brands fa-facebook me-3" />
  <a href="#" classname="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0 dark:text-white lg:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent">
    <i className="fa-brands fa-twitter me-3" />
  </a>
  <a href="#" classname="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0 dark:text-white lg:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent">
    <i className="fa-brands fa-tiktok me-3" />
  </a>
  <a href="#" classname="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0 dark:text-white lg:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent">
    <i className="fa-brands fa-linkedin me-3" />
  </a>
  <a href="#" classname="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0 dark:text-white lg:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent">
    <i className="fa-brands fa-youtube me-3" />
  </a></div>

            </a>

        </li>
        
   
       
       
      </ul>
    </div>
  </div>
</nav>


  )
}
