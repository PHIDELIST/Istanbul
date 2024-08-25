import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import NavbarMenu from "./components/NavbarMenu";
import ViewProduct from "./pages/ViewProduct";
import About from "./pages/About";
import Checkout from "./pages/Checkout";
import PayPal from "./components/PayPal";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { CartWrapper } from "./components/CartContext";
import DeleteUser from "./pages/DeleteUser";
import UpdatePassword from "./pages/UpdatePassword";
import Contact from "./pages/Contact";
import ProtectedRoute from "./components/ProtectedRoute";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Admin from "./admin/layouts/Admin";

const initialOptions = {
    "client-id": "test",
    "currency": "USD",
    "intent": "capture"
};

function App() {
    return (
        <CartWrapper>
            <PayPalScriptProvider options={initialOptions}>
                <Router>
                    <Switch>
                        <ProtectedRoute path="/admin" component={Admin} allowedRoles={[ "admin"]} />
                        <Route path="/">
                            <NavbarMenu />
                            <Switch>
                                <Route exact path="/" component={Home} />
                                <Route path="/about" component={About} />
                                <ProtectedRoute path="/checkout" component={Checkout} allowedRoles={["admin","user"]} />
                                <ProtectedRoute path="/checkout-paypal" component={PayPal} allowedRoles={[ "user","admin"]} />
                                <Route path="/login" component={Login} />
                                <Route path="/signup" component={Signup} />
                                <ProtectedRoute path="/deleteuser" component={DeleteUser} allowedRoles={["user", "admin"]} />
                                <ProtectedRoute path="/updatepassword" component={UpdatePassword} allowedRoles={["user", "admin"]} />
                                <Route path="/viewproduct/:id" component={ViewProduct} />
                                <Route path="/contact" component={Contact} />
                                <Redirect to="/" /> 
                            </Switch>
                            <Footer />
                        </Route>
                    </Switch>
                </Router>
            </PayPalScriptProvider>
        </CartWrapper>
    );
}

export default App;
