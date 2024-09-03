import React, { useContext, useState } from 'react';
import {Formik, useFormik} from "formik";
import * as Yup from "yup"
import axios from "axios"
import {Link, useNavigate} from "react-router-dom";
import { UserContext } from '../../Context/UserContext';

export default function Login() {
  let navigate = useNavigate();
  let {setuserLogin} = useContext(UserContext)
  const [apiError, setapiError] = useState("");
 

 async function handleLogin(formValue){
 
   await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", formValue)
   .then((response)=>{
    if(response.data.message == "success"){
      localStorage.setItem("userToken",response.data.token);
      setuserLogin(response.data.token)
setuserLogin(response.data.token)
      navigate("/")
       
 }
 console.log(response.data.message);
})
  
  .catch((error) => {
  
    console.log(response.data.message);
})
}
  let schema = Yup.object().shape({
    email:Yup.string().required("Email is required").email("Email is Invalid"),
 password:Yup.string().required("Password is required").matches(/^[A-Z].{5,10}$/,"must start with uppercase"),
  })
 let formik = useFormik({
    initialValues:{
      email:"", 
      password:"",
    },onSubmit: handleLogin, 
    validationSchema: schema
  })
  
  return (
    <div className=' py-6 max-w-xl mx-auto rounded-md p-4   shadow-2xl mt-[80px]'>
 {apiError? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
 {apiError}
</div>: null}
      <h2 className='text-green-600 text-3xl font-bold'>Login</h2>
      

<form onSubmit={formik.handleSubmit} className=" mt-5 mx-auto">
 
  <div className="relative z-0 w-full mb-5 group">
    <input value={formik.values.email}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
     type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
    <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">User Email :</label>
    {formik.errors.email && formik.touched.email ?  <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
 {formik.errors.email}
</div>: null}
  </div>
  <div className="relative z-0 w-full mb-5 group">
    <input value={formik.values.password}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
 type="password" name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
 <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">User Password :</label>
    {formik.errors.password && formik.touched.password ?  <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
 {formik.errors.password}
</div>: null}
  </div>
<div className="flex items-center">
<button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
  Login
    </button>
    <Link to="/forgotPassword" className='font-semibold'> Forgot Password</Link>
    <br/>
 <p className='pl-4'>Didn't have an account Yet? <span className='font-semibold'><Link to={"/Register"}>Register Now</Link></span></p>
</div>

</form>


    </div>
  )
}

