import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../Context/CartContext'
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { WishContext } from '../../Context/WishContext';
import Loading from '../Loading/Loading';

export default function WishList() {
    
    let { addProductToCart,setnumbOfCartItem } = useContext(CartContext);
    let { getWish, wish, setwish,deleteWishItem} = useContext(WishContext)
    const [loading, setisloading] = useState(false);
    const [currentProductId, setcurrentProductId] = useState(0);

    async function getWishItem() {
        let response = await getWish();
        // console.log(response);

    }
  async function clearWish(productId){
    let response = await deleteWishItem(productId);
    await getWishItem()
}
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
            clearWish(productId)
          }else{
            setisloading(false)
            toast.error(response.data.message);
          }
       
          console.log(response);
        }

    useEffect(
        () => {
            getWishItem();
    
        }, []
    )
    return (
        <>
        
            <div className='bg-gray-100 w-3/4 p-8 container mx-auto rounded-md my-6 mt-[80px] '>
                <div className='flex flex-wrap justify-between'>
                    <div className='space-y-3 text-center'>
                        <h1 className='text-3xl text-center text-green-500'>My Favorite List </h1>
                    </div>
                </div>

            </div>
            <div className="relative overflow-x-auto  sm:rounded-lg">

                {<>
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
                                    Price
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Add To Cart
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {wish.map((product) =>
                                <tr key={product._id} className="bg-white border-b  hover:bg-gray-50">
                                    <td className="p-4">
                                        <img src={product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" />
                                    </td>
                                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                        {product.title}
                                    </td>

                                    <td className="px-6 py-4 font-semibold text-gray-900 ">
                                        <span> {product.price} EGP</span>
                                    </td>
                                    <td> <button className='btn'onClick={()=> addProduct(product._id)}>
{currentProductId === product.id && loading? <i className='fas fa-spinner fa-spin'></i>:"Add To Cart"}

</button>
                                    </td>
                                </tr>
                            )}


                        </tbody>

                    </table>


                </>}



            </div>
        </>
    )
}
