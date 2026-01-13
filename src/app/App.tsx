import React, { useState } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import HomePage from "./screens/homePage";
import ProductsPage from "./screens/productsPage";
import PausedOrdersPage from "./screens/ordersPage/PausedOrdersPage";
import ProcessOrdersPage from "./screens/ordersPage/ProcessOrdersPage";
import FinishedOrdersPage from "./screens/ordersPage/FinishedOrdersPage";
import OrdersRedirect from "./screens/ordersPage/OrdersRedirect";
import UserPage from "./screens/userPage";
import OrderSuccessPage from "./screens/orderSuccessPage/OrderSuccessPage";
import CartPage from "./screens/cartPage/CartPage";
import CheckoutPage from "./screens/checkoutPage/CheckoutPage";
import HomeNavbar from "./components/headers/HomeNavbar";
import OtherNavbar from "./components/headers/OtherNavbar";
import Footer from "./components/footer";
import HelpPage from "./screens/helpPage";
import useBasket from "./hooks/useBasket";
import AuthenticationModal from "./components/auth";
import "../css/app.css";
import "../css/navbar.css";
import "../css/footer.css";
import "../css/cart.css";
import "../css/checkout.css";
import "../css/premiumAlerts.css";
import "../css/orderSuccessPage.css";

function App() {
  const location = useLocation();
  const { cartItems, onAdd, onRemove, onDelete, onDeleteAll } = useBasket();
  const [signupOpen, setSignupOpen] = useState<boolean>(false);
  const [loginOpen, setLoginOpen] = useState<boolean>(false);

  /** HANDLERS **/
  const handleSignupClose = () => setSignupOpen(false);
  const handleLoginClose = () => setLoginOpen(false);

  return (
    <>
      {location.pathname === "/" ? (
        <HomeNavbar
          cartItems={cartItems}
          onAdd={onAdd}
          onRemove={onRemove}
          onDelete={onDelete}
          onDeleteAll={onDeleteAll}
          setSignupOpen={setSignupOpen}
          setLoginOpen={setLoginOpen}
        />
      ) : (
        <OtherNavbar
          cartItems={cartItems}
          onAdd={onAdd}
          onRemove={onRemove}
          onDelete={onDelete}
          onDeleteAll={onDeleteAll}
          setSignupOpen={setSignupOpen}
          setLoginOpen={setLoginOpen}
        />
      )}
      <Switch>
        <Route path="/products">
          <ProductsPage onAdd={onAdd} />
        </Route>
        <Route exact path="/orders">
          <OrdersRedirect />
        </Route>
        <Route path="/orders/paused">
          <PausedOrdersPage />
        </Route>
        <Route path="/orders/process">
          <ProcessOrdersPage />
        </Route>
        <Route path="/orders/finished">
          <FinishedOrdersPage />
        </Route>
        <Route path="/member-page">
          <UserPage />
        </Route>
        <Route path="/help">
          <HelpPage />
        </Route>
        <Route path="/cart">
          <CartPage
            cartItems={cartItems}
            onAdd={onAdd}
            onRemove={onRemove}
            onDelete={onDelete}
            onDeleteAll={onDeleteAll}
          />
        </Route>
        <Route path="/checkout">
          <CheckoutPage
            cartItems={cartItems}
            onDeleteAll={onDeleteAll}
          />
        </Route>
        <Route path="/order-success/:orderId">
          <OrderSuccessPage />
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
      <Footer />
      <AuthenticationModal
        signupOpen={signupOpen}
        loginOpen={loginOpen}
        handleSignupClose={handleSignupClose}
        handleLoginClose={handleLoginClose}
      />
    </>
  );
}

export default App;
