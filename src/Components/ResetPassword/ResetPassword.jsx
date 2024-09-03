import axios from 'axios'
import { useFormik } from 'formik'
import React from 'react'
import { useNavigate } from 'react-router-dom'
export default function ResetPassword() {
let navigate = useNavigate()
async function newPassword(values){
    let {data} = await axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, values);
    if( data.token){
        navigate("/login")
    }
}
    let formik = useFormik({
        initialValues:{
            email:"",
    newPassword: "" ,
        },onSubmit: newPassword 
      })
  return (
    <div >
<form className='w-75 mx-auto my-5' onSubmit={formik.handleSubmit}>
    <h3>Forgot Password :</h3>
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
    <input value={formik.values.newPassword}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
 type="password" name="newPassword" id="newPassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
 <label htmlFor="newPassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">New Password :</label>
    {formik.errors.newPassword && formik.touched.newPassword ?  <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
 {formik.errors.newPassword}
</div>: null}
  </div>
    <button type="submit" className='btn my-3'>Reset Password</button>
   </form>
</div>
  )
}
