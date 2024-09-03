import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import {RouterProvider, createBrowserRouter} from "react-router-dom";
import './App.css';
import LayOut from './Components/LayOut/LayOut';
import Products from './Components/Products/Products';
import Categories from './Components/Categories/Categories';
import Brands from './Components/Brands/Brands';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Home from './Components/Home/Home';
import NotFound from './Components/NotFound/NotFound';
import Cart from './Components/Cart/Cart';
import UserContextProvider from './Context/UserContext';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import CartContextProvider from './Context/CartContext';
import  toast, {Toaster} from "react-hot-toast";
import CheckOut from './Components/CheckOut/CheckOut';
import AllOrders from './Components/AllOrders/AllOrders';
import ForgotPassword from './Components/ForgotPassword/ForgotPassword';
import ResetPassword from './Components/ResetPassword/ResetPassword';
import WishList from './Components/WishList/WishList';
import WishContextProvider from './Context/WishContext';



let query = new QueryClient();
const x = createBrowserRouter([
  {path:"" , element: <LayOut/>, children:[
    {index:true, element: <ProtectedRoute>
      <Home/>
    </ProtectedRoute>},
    {path:"products", element:<ProtectedRoute><Products/></ProtectedRoute> },
    {path:"categories", element:<ProtectedRoute><Categories/></ProtectedRoute>},
    {path:"brands", element:<ProtectedRoute><Brands/></ProtectedRoute>},
    {path:"login", element:<Login/>},
    {path:"register", element: <Register/> },
    {path:"forgotPassword", element: <ForgotPassword/> },
    {path:"resetPassword", element: <ResetPassword/> },
    {path:"cart", element:<ProtectedRoute><Cart/></ProtectedRoute> },
    {path:"wish", element:<ProtectedRoute><WishList/></ProtectedRoute> },
    {path:"checkout/:cartId", element:<ProtectedRoute><CheckOut/></ProtectedRoute> },
    {path:"allorders", element:<ProtectedRoute><AllOrders/></ProtectedRoute> },
    {path:"productdetails/:id", element:<ProtectedRoute><ProductDetails/></ProtectedRoute> },
{path:"*", element: <NotFound/>}
  ]}
])
function App() {
  const [count, setCount] = useState(0)

  return (
 <QueryClientProvider client={query}>
    <UserContextProvider>
      <CartContextProvider>
  <WishContextProvider>
   <RouterProvider router={x}></RouterProvider>
<ReactQueryDevtools />
<Toaster/>
</WishContextProvider>
    </CartContextProvider>
    </UserContextProvider>
 </QueryClientProvider>
  )
}

export default App
