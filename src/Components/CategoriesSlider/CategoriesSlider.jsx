import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Slider from "react-slick";

export default function CategoriesSlider() {
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 8,
        slidesToScroll: 3,
        autoplay:true,
      };
      const [categories, setCategories] = useState([])
      function getCategories(){
          axios.get('https://ecommerce.routemisr.com/api/v1/categories')
          .then(({data})=>{
            setCategories(data.data)
          })
          .catch((error)=>{
  
          })
      }
      useEffect(()=>{
        getCategories();
            },[])
  return (
 <>
 <div className="py-5">
    <h2 className='py-4 text-gray-800 font-medium'>Shop Popular Categories</h2>
 <Slider {...settings}>
    {categories.map((category)=><div >
        <img className='h-[200px] w-full' src={category.image} alt={category.name}/>
        <h3 className='mt-2'>{category.name}</h3>
    </div>)}
    </Slider>
 </div>

 </>
  )
}
