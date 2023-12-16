import React from 'react';
import './App.css';
import Home from './pages/Home';
import Loginpage from './pages/Loginpage';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Signuppage from './pages/Signuppage';
import Cart from './features/Cart/Cart';
import Productdetail from './features/Product/components/Productdetail';
import Notfound from './pages/Notfound';
import Protected from './features/Auth/Components/protected';
import Navbar from './features/navbar/Navbar';
import CheckoutPage from './pages/CheckoutPage';
import OrderSuccess from './pages/OrderSuccess';
import Orders from './features/Orders/Orders'
import OrderPage from './pages/OrderPage';
import ProfilePage from './pages/ProfilePage';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <Home/>
      </Protected>
      
    ),
  },
  {
    path: "/signup",
    element:<Signuppage/>,
  },
  {
    path: "/login",
    element: <Loginpage/>,
  },
  {
    path: "/cart",
    element: <Protected><Cart/></Protected>,
  },
  {
    path: "/checkout",
    element: <Protected><CheckoutPage/></Protected>,
  },
  {
    path: "/product-detail/:id",
    element: <Protected><Productdetail/></Protected>,
  },
  {
    path: "/orderSuccess/:id",
    element: <Protected><OrderSuccess/></Protected>
  },
  {
    path: "/orders",
    element: <Protected><OrderPage/></Protected>
  },
  {
    path: "/profile",
    element: <Protected><ProfilePage/></Protected>
  },
  {
    path: "/*",
    element: <Notfound/>,
  },
]);

function App() {
  return (<>
    <RouterProvider router={router} />
    </>
  );
}

export default App;
