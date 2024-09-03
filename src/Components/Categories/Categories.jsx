import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loading from '../Loading/Loading';


export default function Categories() {
  const [category, setcategory] = useState(null)
  async function getcategoris() {
      try{
          let {data}=await axios(`https://ecommerce.routemisr.com/api/v1/categories`)
          setcategory(data.data)
       
      }
      catch(err)
      {
          console.log(err)
      }
    
      
  }
  useEffect(() => {
     getcategoris()
  }, [])
  return (
    <>
    {category == null ? <Loading/> : <> 
    <div className='container mx-auto p-4 mt-11'>
     <h1 className='text-center text-4xl font-bold text-green-600'>All Categories</h1>
      <div className="flex flex-wrap ">
        {category?.map((p)=><div key={p.id} className='p-4 text-center lg:w-1/4 md:w-1/3 w-full  '>
            <div className='border border-gray-300  hover:shadow-lg hover:shadow-green-300'>
            <img src={p.image} className='w-full md:h-[350px] object-cover'/>
            <h1 className='pb-3 text-green-800 text-xl font-semibold'>{p.name}</h1>
            </div>

        </div>)}

     </div>

    </div>
    </>}
   
    
    
    </>
  )
}
