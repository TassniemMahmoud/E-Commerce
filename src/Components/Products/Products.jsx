import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import Loading from '../Loading/Loading';
import { WishContext } from '../../Context/WishContext';


export default function Products() {
  let {addProductToCart,setnumbOfCartItem} = useContext(CartContext);
  let {addToWish} = useContext(WishContext);
  const [loading, setisloading] = useState(false);
  const [currentProductId, setcurrentProductId] = useState(0);
  const [wishProductId, setwishProductId] = useState(0)
  function getRecent(){
    return axios .get(`https://ecommerce.routemisr.com/api/v1/products`)
}
let {data,error,isError,isLoading,isFetching}=  useQuery({
 queryKey:['recentProducts'],
queryFn:getRecent,
staleTime:50000,

 })
 if(isLoading){
  return <Loading/>
 }
/* To add Product To cart*/
 async function addProduct(productId){
  setcurrentProductId(productId);
  setisloading(true)
    let response = await addProductToCart(productId);
    setnumbOfCartItem(response.data.numOfCartItems);
    if (response.data.status == "success"){
      setisloading(false);
      toast.success(response.data.message,{
        duration:1000,
        icon: '👏',
      
      });
    }else{
      setisloading(false)
      toast.error(response.data.message);
    }
 
    console.log(response);
  }
  /* to add product to wishlist*/
  async function addwish(productId){
    setwishProductId(productId)
      let response = await addToWish(productId);
      console.log(response);
      if (response.data.status == "success"){
        // setisloading(false);
        toast.success(response.data.message,{
          duration:1000,
          icon: '👏',
        
        });
      }else{
        // setisloading(false)
      
      }
   
     
    }
  return (
    <>
    
    <div className="row">
        { data?.data.data.map((product)=>   <div key={product.id} className="w-1/6 px-4">
            <div className="product py-4">
                <Link to={`/productdetails/${product.id}`}>
<img src={product.imageCover} alt ={product.title} className='w-full'/>
<span className='block font-light text-green-600'>{product.category.name}</span>
<h3 className='text-lg font-normal text-gray-800 mb-4'>{product.title.split(" ").slice(0,2).join(" ")}</h3>
<div className="flex justify-between">
<span>{product.price} EGP</span>
<span>{product.ratingsAverage}<i className='fas fa-star text-yellow-400'></i></span>

</div>

</Link>
{wishProductId === product.id ?< i onClick={()=>addwish(product.id)}  className='fa-solid fa-heart text-red-600'></i>: < i onClick={()=>addwish(product.id)}  className='fa-solid fa-heart text-black'></i>}

<button className='btn'onClick={()=> addProduct(product.id)}>
{currentProductId === product.id && loading? <i className='fas fa-spinner fa-spin'></i>:"Add To Cart"}

</button>
            </div>
        </div> )}
       
    </div>
    </>
  )
}
