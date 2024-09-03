import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../Context/CartContext'
import { Link, useNavigate } from 'react-router-dom';
import Loading from '../Loading/Loading';
import { WishContext } from '../../Context/WishContext';

export default function Cart() {
let {getLoggedUserCart, updataCartItemCount,deleteProductItem,setnumbOfCartItem,clearCart} = useContext(CartContext);
let { setcartId,cartId} = useContext(WishContext)
const [cartDetails, setcartDetails] = useState(null);
const [noCartInfo, setnoCartInfo] = useState('')
let navigate = useNavigate()

async function getCartItem(){
   let response = await getLoggedUserCart();
 /* console.log(response.data);*/
 setcartId(response.data._id)
   setcartDetails(response.data.data);
}

async function updateCartCount(productId,count){
   let response = await updataCartItemCount(productId,count);
 /* console.log(response.data);*/
   setcartDetails(response.data.data);
}

async function deleteItem(productId){
  let response = await deleteProductItem(productId);
/* console.log(response.data);*/
console.log(response.data);
setnumbOfCartItem(response.data.numOfCartItems)
  setcartDetails(response.data.data);

}

async function clearAllCart(){
  let response = await clearCart();
console.log(response.data);
if(response.data.message == "success"){
  setnoCartInfo("No Item to show")
}
 /* setcartDetails(response.data.data);*/
}
useEffect(()=>{
 getCartItem()
},[])

function goToCheckout(){
 navigate(`/checkout/${cartId}`)
}
  return (
   <>
   {cartDetails == null ? <Loading/> : <>
   <div className="relative overflow-x-auto  sm:rounded-lg mt-[80px]">
  <h2 className='text-3xl text-center text-green-600 font-semibold'>Shopping Cart</h2>
  {noCartInfo ? noCartInfo :<> 
    <div className="flex justify-between items-center mb-3 ">
  <h3 className='text-green-600 font-semibold '> Total Price:{cartDetails?.totalCartPrice}</h3>
  <button onClick={clearAllCart} className='bg-red-600 rounded-lg px-2 py-2 text-white'>Clear Cart
  <i className="fa-solid fa-trash ms-2"></i>
  </button>
  </div>
  
  <table className="w-3/4 mx-auto my-6 text-sm text-left rtl:text-right text-gray-500 ">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
      <tr>
        <th scope="col" className="px-16 py-3">
          <span className="sr-only">Image</span>
        </th>
        <th scope="col" className="px-6 py-3">
          Product
        </th>
        <th scope="col" className="px-6 py-3">
          Qty
        </th>
        <th scope="col" className="px-6 py-3">
          Price
        </th>
        <th scope="col" className="px-6 py-3">
          Action
        </th>
      </tr>
    </thead> 

    <tbody>
      {cartDetails?.products.map((product)=>
        <tr key={product.product.id} className="bg-white border-b  hover:bg-gray-50">
        <td className="p-4">
          <img src={product.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt={product.product.title} />
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
          {product.product.title}
        </td>
        <td className="px-6 py-4">
          <div className="flex items-center">
            <button onClick={()=>updateCartCount(product.product.id, product.count - 1)} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200   " type="button">
              <span className="sr-only">Quantity button</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
              </svg>
            </button>
            <div>
              <span>{product.count}</span>
            </div>
            <button onClick={()=>updateCartCount(product.product.id, product.count + 1)} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 " type="button">
              <span className="sr-only">Quantity button</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
              </svg>
            </button>
          </div>
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 ">
         <span> {product.price} EGP</span>
        </td>
        <td className="px-6 py-4">
          <span onClick={()=>deleteItem(product.product.id)} className=" cursor-pointer font-medium text-red-600  hover:underline">Remove</span>
        </td>
      </tr>
      )}
    
   
    </tbody>
    
  </table>
  
  <button className='btn' onClick={goToCheckout}>
Check Out Now
 </button>
  </> }

 

</div>
   </>}





   </>
  )
}
