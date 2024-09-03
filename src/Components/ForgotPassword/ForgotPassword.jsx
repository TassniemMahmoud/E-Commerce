import axios from 'axios'
import { useFormik } from 'formik'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from "yup"
axios
export default function ForgotPassword() {


 async function sendCode(values){
let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, values)
if(data.statusMsg == "success"){
document.querySelector(".forgotpassword").classList.add("hidden");
document.querySelector(".verifyCode").classList.remove("hidden");

}
    }
    let schema = Yup.object().shape({
      email  :Yup.string().required("Email is required").email("Email is Invalid"),
      })
    let formik = useFormik({
        initialValues:{
          email:"", 
        },onSubmit: sendCode, 
        validationSchema: schema
      })
      /* To verify code*/
      let navigate = useNavigate()
 async function verifyCode(values){
let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, values)
if(data.status == "Success"){
navigate("/resetPassword")
}
    }
    let schema2 = Yup.object().shape({
        resetCode:Yup.string().required("Code is required")
      })
    let verifyFormik = useFormik({
        initialValues:{
            resetCode:"", 
        },onSubmit: verifyCode, 
        validationSchema: schema2
      })
  return (
   <>
<div className='forgotpassword '>
<form className='w-75 mx-auto my-5' onSubmit={formik.handleSubmit}>
    <h3>Forgot Password :</h3>
   <input value={formik.values.email}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" User Email"  />
    <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">User Email :</label>
    {formik.errors.email && formik.touched.email ?  <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
 {formik.errors.email}
</div>: null}
    <button type="submit" className='btn my-3'>Send Code</button>
   </form>
</div>
<div className='verifyCode hidden'>
<form className='w-75 mx-auto my-5' onSubmit={verifyFormik.handleSubmit}>
    <h3>Verify Code:</h3>
   <input value={verifyFormik.values.resetCode}
    onChange={verifyFormik.handleChange}
    onBlur={verifyFormik.handleBlur}
    type="text" name="resetCode" id="resetCode" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" User resetCode"  />
    <label htmlFor="resetCode" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">resetCode :</label>
    {verifyFormik.errors.resetCode && verifyFormik.touched.resetCode ?  <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
 {verifyFormik.errors.resetCode}
</div>: null}
    <button type="submit" className='btn my-3'>Send Code</button>
   </form>
</div>
   </>
  )
}
