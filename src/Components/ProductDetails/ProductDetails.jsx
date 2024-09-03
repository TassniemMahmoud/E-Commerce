import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Slider from "react-slick";
import Loading from '../Loading/Loading';
import { CartContext } from '../../Context/CartContext';
import { WishContext } from '../../Context/WishContext';
import toast from 'react-hot-toast';

export default function ProductDetails() {
  let {addProductToCart,setnumbOfCartItem} = useContext(CartContext);
  let {addToWish} = useContext(WishContext);
  const [loading, setisloading] = useState(false);
  const [currentProductId, setcurrentProductId] = useState(0);
  const [wishProductId, setwishProductId] = useState(0)
    let {id} = useParams();
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
    const [productDetails, setProductDetails] = useState(null)
    function getProductDetails(id){
        axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
        .then(({data})=>{
/*console.log(data.data);*/
setProductDetails(data.data)
        })
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
  useEffect(()=>{
    getProductDetails(id)
  },[]);
 
  return (
 <>
 {productDetails == null ? <Loading/> : <>
 <div className="row">

    <div className="w-1/4">
    <Slider {...settings}>
    {productDetails?.images.map((src)=><img src={src} alt={productDetails?.title} className='w-full'/>)}
    </Slider>
        
    </div>
    <div className="w-3/4 p-6">
        <h1 className='text-lg font-normal text-gray-950'> {productDetails?.title}</h1>
<p className='text-gray-600 mt-4 light'>{productDetails?.description}</p>
<div className="flex my-4 justify-between items-center">
<span>{productDetails?.price} EGP</span>
<span>{productDetails?.ratingsAverage}<i className='fas fa-star text-yellow-400'></i></span>
{wishProductId === productDetails.id ?< i onClick={()=>addwish(productDetails.id)}  className='fa-solid fa-heart text-red-600'></i>: < i onClick={()=>addwish(productDetails.id)}  className='fa-solid fa-heart text-black'></i>}

</div>
<button className='btn'onClick={()=> addProduct(productDetails.id)}>
{currentProductId === productDetails.id && loading? <i className='fas fa-spinner fa-spin'></i>:"Add To Cart"}

</button>
    </div>

 </div>
 </>}
 
 </>
  )
}
