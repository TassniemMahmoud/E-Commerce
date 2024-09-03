
import React, { useState } from 'react';
import {Formik, useFormik} from "formik";

import axios from "axios"
import { useNavigate, useParams } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../../Context/CartContext';

export default function CheckOut() {
  let {cartId} = useParams()
  let navigate = useNavigate()
  const [isOnlinePayment, setisOnlinePayment] = useState(false)
    let {cashOnDelivery }= useContext(CartContext);
   let formik = useFormik({
    initialValues:{
      details: "",
      phone: "",
      city: "",
    },onSubmit:()=> pay(), 
   
  })
 
  
   async function pay(){
 let url =`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`
    if(isOnlinePayment){
   url = `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`

    }
  let response= await cashOnDelivery(url, formik.values);
  if(response.status == "success"){
    if(isOnlinePayment){
      window.location.href = response.session.url

    }else {
      navigate("/allorders")
    }
   

  }else{
    console.log("error");
  }
  }
  
    
    return (
      <div className=''>
  
        <h2 className='text-green-600 font-semibold text-2xl text-center'>Checkout Now</h2>
        
 <div className="mx-auto w-[50%]">
 <form onSubmit={formik.handleSubmit} className=" mt-5 mx-auto">
   
   <div className="relative z-0 w-full mb-5 group">
     <input value={formik.values.details}
     onChange={formik.handleChange}
     onBlur={formik.handleBlur}
      type="text" name="details" id="details" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
     <label htmlFor="details" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Details :</label>
    
   </div>
   <div className="relative z-0 w-full mb-5 group">
     <input value={formik.values.phone}
     onChange={formik.handleChange}
     onBlur={formik.handleBlur}
  type="tel" name="phone" id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
  <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone :</label>
    
   </div>
   <div className="relative z-0 w-full mb-5 group">
     <input value={formik.values.city}
     onChange={formik.handleChange}
     onBlur={formik.handleBlur}
  type="text" name="city" id="city" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
  <label htmlFor="city" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">City :</label>
    
   </div>
 <div className="flex items-center flex-col">
  <input type='checkbox' id ="forOnline" onChange={()=>setisOnlinePayment(!isOnlinePayment)}/>
  <label htmlFor='forOnline'> Pay Online</label>
 <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
 {isOnlinePayment ? "PayOnline" : "  Cash On Delivery"}
     </button>
 
 </div>
 
 </form>
 </div>
  
  
      </div>
    )
}
