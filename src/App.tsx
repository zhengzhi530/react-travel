import React, { useEffect } from "react";
import styles from "./App.module.css";
import { BrowserRouter, Route, Routes, Navigate,useLocation} from "react-router-dom";
import {
  HomePage,
  SignInPage,
  RegisterPage,
  DetailPage,
  SearchPage,
  ShoppingCartPage,
  PlaceOrderPage
} from "./pages";
import { useSelector } from "./redux/hooks";
import { useDispatch } from "react-redux";
import { getShoppingCart } from "./redux/shoppingCart/slice";

function App() {
  const jwt = useSelector((s) => s.user.token);
  const dispatch = useDispatch()


  useEffect(() => {
    if (jwt) {
      dispatch(getShoppingCart(jwt));
    }
  }, [jwt]);

  
const PrivateRoute = (props: { children: React.ReactNode }): JSX.Element => {
  const location = useLocation()
  const { children } = props
   return jwt ? (
   // 如果是登录用户，则可以访问我们传入的 children 组件
     <>{children}</>
   ) : (
   // 未登录用户重定向到 login 页面
     <Navigate
       replace={true}
       to="/signIn"
       state={{ from: `${location.pathname}${location.search}` }}
     />
   )
 }

  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signIn" element={<SignInPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/detail/:touristRouteId" element={<DetailPage />} />
          <Route path="/search/:keywords?" element={<SearchPage />} />

           {/* v6 的 element 里面只能接受一个 JSX 元素 */}
          <Route path="/shoppingCart" element={<PrivateRoute> <ShoppingCartPage /> </PrivateRoute>}/>
          <Route path="/placeOrder" element={<PrivateRoute> <PlaceOrderPage /> </PrivateRoute>}/>

          {/* <PrivateRoute
            isAuthenticated={jwt !== null}
            path="/shoppingCart"
            component={ShoppingCartPage}
          /> */}
          
          <Route path="*" element={<h1>404 not found 页面去火星了 ！</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
