import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast';

export let WishContext = createContext();

export default function WishContextProvider(props) {
    const [wish, setwish] = useState([]);
    const [cartId, setcartId] = useState(null);
    const [wishId, setwishId] = useState(null);
    let headers = {
        token: localStorage.getItem('userToken')
    }
    async function addToWish(productId) {
        try {

            let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,
                {
                    "productId": productId
                },
                { headers: headers }
            )
            toast.success(data.message)
            setwish(data)
            return data
        }
        catch (err) {

            console.log(err)
        }
    }
    async function getWish() {
        try {

            let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,
                { headers: headers }
            )
         
           setwish(data?.data)
            return data
        }
        catch (err) {

            console.log(err)
        }
    }
   async function deleteWishItem(productId) {
        try {

            let { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
                { headers: headers }
            )
           
           setwish(data?.data)
            return data
        }
        catch (err) {

            console.log(err)
        }
      
    }

  return (   <WishContext.Provider value={{deleteWishItem, wish, setwish,addToWish, getWish,cartId, setcartId}} >

{props.children}
  </WishContext.Provider>

  )
}

