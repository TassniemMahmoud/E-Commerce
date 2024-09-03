import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loading from '../Loading/Loading';

export default function Brands() {
  const [brands, setbrands] = useState();
  async function getBrands() {
    return axios(`https://ecommerce.routemisr.com/api/v1/brands`)
      .then((data) => {
        setbrands(data?.data.data);
      })
      .catch((error) => {
        console.log(error);
      })

  }

  useEffect(() => {
    getBrands()
  }, [])

  return (
    <>
    {brands == null ? <Loading/> : <>    <div className='container mx-auto p-4 mt-11 font-bold'>
        <h1 className='text-center text-3xl text-green-600'>All Brands</h1>
      </div>
      <div>
        <div className="row">
        {brands?.map((p) => <div key={p.id} className='p-4 text-center w-1/4  '>
          <div className='border border-gray-500 brand hover:shadow-lg hover:shadow-[#4FA74F]'>
            <img src={p.image} className='w-full' />
            <h1 className='pb-3'>{p.name}</h1>
          </div>

        </div>)}
        </div>
       
      </div></>}
   

    </>
  )
}

