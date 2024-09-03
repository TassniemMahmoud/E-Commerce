import React, { useState } from 'react';
import mainSlider1 from "../../assets/imgs/main-slider-3.jpeg";
import mainSlider2 from "../../assets/imgs/grocery-banner.png";
import mainSlider3 from "../../assets/imgs/slide-1.jpeg";
import slide1 from "../../assets/imgs/main-slider-2.jpeg";
import slide2 from "../../assets/imgs/main-slider-1.jpeg";
import Slider from "react-slick";


export default function MainSlider() {
 
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay:true,
        arrows:false,
      };
   
  return (
    
   <>
   <div className="row">
    <div className="w-3/4">
    <Slider {...settings}>
    <img src={mainSlider1} className='w-full h-[400px] object-cover'/>
    <img src={mainSlider2} className='w-full h-[400px] object-cover'/>
    <img src={mainSlider3} className='w-full h-[400px] object-cover'/>
    </Slider>

       
    </div>
    <div className="w-1/4">
    <img src={slide1} className='w-full h-[200px] object-cover'/>
    <img src={slide2} className='w-full h-[200px] object-cover'/>
    </div>
    
   </div>
   
   </>
  )
}
