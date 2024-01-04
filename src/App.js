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
import Logout from './features/Auth/Components/Logout';
import ProtectedAdmin from './features/Auth/Components/protectedAdmin';
import AdminProductPage from './pages/AdminProductPage';
import AdminProductDetailPage from './pages/AdminProductDetail';
import AdminProductForm from './features/admin/components/AdminProductForm';
import AdminProductFormPage from './pages/AdminProductFormPage';
import ProductDetailPage from './pages/ProductDetailPage';
import AdminOrdersTablePage from './pages/AdminOrdersTablePage';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

const options = {
  // you can also just use 'bottom center'
  position: positions.TOP_RIGHT,
  timeout: 3000,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.FADE
}

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
    element: <Protected><ProductDetailPage/></Protected>,
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
    path: "/logout",
    element: <Logout/>
  },
  {
    path: "/admin/",
    element:  <ProtectedAdmin>
      <AdminProductPage/>
    </ProtectedAdmin>
  },
  {
    path: "/admin/product-details/:id",
    element:  <ProtectedAdmin>
      <AdminProductDetailPage/>
    </ProtectedAdmin>
  },
  {
    path: "/admin/product-form",
    element:  <ProtectedAdmin>
      <AdminProductFormPage/>
    </ProtectedAdmin>
  },
  {
    path: "/admin/product-form/edit/:id",
    element:  <ProtectedAdmin>
      <AdminProductFormPage/>
    </ProtectedAdmin>
  },
  {
    path: "/admin/Orders",
    element:  <ProtectedAdmin>
      <AdminOrdersTablePage/>
    </ProtectedAdmin>
  },
  {
    path: "/*",
    element: <Notfound/>,
  },
]);

function App() {
  return (<>
  <AlertProvider template={AlertTemplate} {...options}>
    <RouterProvider router={router} />
  </AlertProvider>
    </>
  );
}

export default App;
