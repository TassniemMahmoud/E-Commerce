import axios from "axios";
import { createContext, useEffect, useState } from "react";
// import toast from "react-hot-toast";

export let CartContext = createContext();

export default function CartContextProvider(props) {
    const [numbOfCartItem, setnumbOfCartItem] = useState(0);
   
    let headers = {
        token: localStorage.getItem('userToken')
    }

    function getLoggedUserCart() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
            headers
        })
            .then((response) => response)

            .catch((error) => error)
    }
    function deleteProductItem(productId) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
            headers
        })
            .then((response) => response)

            .catch((error) => error)
    }

    function addProductToCart(productId) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, {
            productId: productId
        },
            {
                headers
            })
            .then((response) => response)

            .catch((error) => error)
    }

    function updataCartItemCount(productId, count) {
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
            count: count
        },
            {
                headers
            })
            .then((response) => response)

            .catch((error) => error)
    }
    function clearCart(productId, count) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,
            {
                headers
            })
            .then((response) => response)

            .catch((error) => error)
    }

    /*for Payment*/
    function cashOnDelivery(url, shippingAddress) {

        return axios.post(url),
        {
            shippingAddress
        }, {
            headers
        }.then((res) => res.data)
            .catch(err => err.response.data)
    }
    /*WishList*/
   
    return <CartContext.Provider
        value=
        {{ getLoggedUserCart, addProductToCart, updataCartItemCount, deleteProductItem, numbOfCartItem, setnumbOfCartItem,  cashOnDelivery,  clearCart }}>

        {props.children}
    </CartContext.Provider>
}